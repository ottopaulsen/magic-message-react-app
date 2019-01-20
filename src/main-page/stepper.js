import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = {
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
};

class Stepper extends React.Component {

    render() {
        const { classes, theme } = this.props;

        return (
            <MobileStepper
                variant="dots"
                steps={this.props.numberOfSteps}
                position="static"
                activeStep={this.props.activeStep}
                className={classes.root}
                nextButton={
                    <Button
                        size="small"
                        onClick={this.props.next}
                        disabled={this.props.activeStep === this.props.numberOfSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={this.props.prev}
                        disabled={this.props.activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        );
    }
}

Stepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Stepper);