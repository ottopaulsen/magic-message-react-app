import React, { Component } from 'react';
import Screen from './screen';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import LifeTimeSelector from './lifetimeselector'
import WriteMessage from './writemessage'
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const lsPrefix = 'Magic-'

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    paper: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    header: {
        display: 'flex',
        justify: 'center',
        height: 50,
        backgroundColor: theme.palette.background.default,
    },
});

class MagicScreens extends Component {

    state = {
        activeScreen: 0,
        lifetime: 1,
    }

    constructor(props) {
        super(props)
        let defaultScreen = parseInt(localStorage.getItem(lsPrefix + 'LastUsedScreen') || '0')
        if (isNaN(defaultScreen) || defaultScreen >= props.screens.length) {
            defaultScreen = 0
        }
        this.state.activeScreen = defaultScreen
    }

    componentDidMount = () => {
        this.handleChangeIndex(this.state.activeScreen)
    }

    handleChangeIndex = index => {
        const activeScreen = mod(index, this.props.screens.length)
        this.lsKeyLifetime = lsPrefix + 'lifetime-' + this.props.screens[activeScreen].name
        let lifetime = parseInt(localStorage.getItem(this.lsKeyLifetime) || "1", 10)
        if (isNaN(lifetime)) {
            lifetime = 720
        }
        this.setState({ activeScreen, lifetime });
        localStorage.setItem(lsPrefix + 'LastUsedScreen', activeScreen)
    };

    slideRenderer = params => {
        const { index, key } = params;
        if (index === this.state.activeScreen) {
            return (
                <div key={key}>
                    <Screen
                        screen={this.props.screens[mod(index, this.props.screens.length)]}
                        deleteMessage={this.props.messageService.deleteMessage}
                    />
                </div>
            )
        } else {
            return (
                <div key={key}>
                </div>
            )
        }
    }

    setLifetime = lifetime => {
        localStorage.setItem(this.lsKeyLifetime, lifetime)
        this.setState({ lifetime })
    }

    nextScreen = () => {
        if (this.state.activeScreen < this.props.screens.length - 1) {
            this.handleChangeIndex(this.state.activeScreen + 1)
        }
    }

    prevScreen = () => {
        if (this.state.activeScreen > 0) {
            this.handleChangeIndex(this.state.activeScreen - 1)
        }
    }

    render() {
        const { classes, theme, screens, messageService } = this.props;
        const { activeScreen } = this.state

        return (
            <div className={classes.root}>

                <MobileStepper
                    steps={screens.length}
                    position="static"
                    activeStep={activeScreen}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.nextScreen} disabled={activeScreen === (screens.length - 1)}>
                            Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.prevScreen} disabled={activeScreen === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                    </Button>
                    }
                />
                <VirtualizeSwipeableViews
                    index={activeScreen}
                    onChangeIndex={this.handleChangeIndex}
                    slideRenderer={this.slideRenderer}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    enableMouseEvents={true}
                    overscanSlideAfter={1}
                    overscanSlideBefore={1}
                >
                </VirtualizeSwipeableViews>
                <LifeTimeSelector lifetime={this.state.lifetime} setLifetime={this.setLifetime} />
                <WriteMessage
                    lifetime={this.state.lifetime}
                    sendMessage={messageService.sendMessage}
                    screenId={screens[activeScreen].key}
                />
            </div>
        );
    }
}

MagicScreens.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MagicScreens);
