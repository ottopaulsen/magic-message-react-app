import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


class LifeTimeChip extends Component {

    state = {}

    // constructor(props) {
    //     super(props)
    //     // this.elementRef = React.createRef()
    //     if(this.props.selected) {
    //         this.props.setSelectedChipElement(React.createRef())
    //     }
    // }

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