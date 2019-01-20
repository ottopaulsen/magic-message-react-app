import React, { Component } from 'react';
import Screen from './screen';
import Stepper from './stepper'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';


const lsPrefix = 'Magic-'

const styles = theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
});

class MagicScreens extends Component {

    state = {}

    constructor(props) {
        super(props)
        const defaultScreen = parseInt(localStorage.getItem(lsPrefix + 'LastUsedScreen') || '0')
        this.state = {
            activeScreen: defaultScreen
        }
    }


    nextScreen = () => {
        this.setState(state => {
            let screen = state.activeScreen
            if (screen < this.props.screens.length - 1) {
                screen++
            }
            localStorage.setItem(lsPrefix + 'LastUsedScreen', screen)
            return { activeScreen: screen };
        });
    }

    prevScreen = () => {
        this.setState(state => {
            let screen = state.activeScreen
            if (screen > 0) {
                screen--
            }
            localStorage.setItem(lsPrefix + 'LastUsedScreen', screen)
            return { activeScreen: screen };
        });
    }

    handleStepChange = activeScreen => {
        this.setState({ activeScreen });
    };

    render() {
        const { classes, theme, screens } = this.props;
        const { activeScreen } = this.state

        return (
            <div className={classes.root}>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeScreen}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {screens.map((step, index) => (
                        <div key={step.id}>
                            {activeScreen == index ? (
                                <Screen screen={this.props.screens[this.state.activeScreen]} />
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    steps={screens.length}
                    position="static"
                    activeStep={activeScreen}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.nextScreen} disabled={activeScreen === screens.length - 1}>
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
            </div>
        );
    }
}

MagicScreens.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MagicScreens);