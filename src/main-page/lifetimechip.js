import React, { Component } from 'react'
import { withStyles } from '@mui/styles';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

const styles = theme => ({
    chip: {
        margin: theme.spacing(0.5),
    },
});


class LifeTimeChip extends Component {

    handleClick = () => {
        this.props.chipClicked(this.props.chipData.minutes)
    }

    render() {
        const { classes } = this.props
        return (
            <Chip
                icon={null}
                label={this.props.chipData.label}
                className={classes.chip}
                color={this.props.selected ? 'primary' : 'default'}
                id={'lifetimechip-' + this.props.chipData.minutes}
                clickable={true}
                onClick={this.handleClick}
            />
        );
    }
}

LifeTimeChip.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LifeTimeChip);
