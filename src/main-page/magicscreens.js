import React, { Component } from 'react';
import Screen from './screen';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import LifeTimeSelector from './lifetimeselector'
import WriteMessage from './writemessage'

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const lsPrefix = 'Magic-'

const styles = theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
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
        const defaultScreen = parseInt(localStorage.getItem(lsPrefix + 'LastUsedScreen') || '0')
        this.setState({activeScreen: defaultScreen})
    }
    
    componentDidMount = () => {
        this.handleChangeIndex(this.state.activeScreen)
    }

    handleChangeIndex = index => {
        const activeScreen = mod(index, this.props.screens.length)
        console.log('handleChangeIndex activeScreen = ', activeScreen)
        this.lsKeyLifetime = lsPrefix + 'lifetime-' + this.props.screens[activeScreen].name
        let lifetime = parseInt(localStorage.getItem(this.lsKeyLifetime) || "1", 10)
        if (isNaN(lifetime)) {
            lifetime = 720
        }
        console.log('handleChangeIndex activeScreen = ', activeScreen, ' lifetime = ', lifetime)
        this.setState({ activeScreen, lifetime });
        localStorage.setItem(lsPrefix + 'LastUsedScreen', activeScreen)
    };

    slideRenderer = params => {
        const { index, key } = params;
        console.log('slideRenderer index = ' + index)
        if(index === this.state.activeScreen) {
                return (
                    <div key={key}>
                    <Screen
                        screen={this.props.screens[mod(index, this.props.screens.length)]}
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
        console.log('setLifetime = ', lifetime)
        localStorage.setItem(this.lsKeyLifetime, lifetime)
        this.setState({ lifetime })
    }

    render() {
        const { classes, theme, screens } = this.props;
        const { activeScreen } = this.state

        return (
            <div className={classes.root}>

                <MobileStepper
                    steps={screens.length}
                    position="static"
                    activeStep={activeScreen}
                    className={classes.mobileStepper}
                // nextButton={
                //     <Button size="small" onClick={this.nextScreen} disabled={activeScreen === (screens.length - 1)}>
                //         Next
                //         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                //     </Button>
                // }
                // backButton={
                //     <Button size="small" onClick={this.prevScreen} disabled={activeScreen === 0}>
                //         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                //         Back
                //     </Button>
                // }
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
                <WriteMessage lifetime={this.state.lifetime} />
            </div>
        );
    }
}

MagicScreens.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MagicScreens);