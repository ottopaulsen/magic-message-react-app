import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import LifeTimeChip from './lifetimechip';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';

const alternatives = [
    { minutes: 1, label: '1 m' },
    { minutes: 15, label: '15 m' },
    { minutes: 30, label: '30 m' },
    { minutes: 60, label: '1 h' },
    { minutes: 180, label: '3 h' },
    { minutes: 360, label: '6 h' },
    { minutes: 720, label: '12 h' },
    { minutes: 1440, label: '24 h' },
    { minutes: 4320, label: '2 d' },
    { minutes: 8640, label: '4 d' },
]

const getAltIndex = function (minutes) {
    for (let i = 0; i < alternatives.length; i++) {
        if (alternatives[i].minutes === minutes) {
            return i
        }
    }
    return null
}

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
        paddingTop: '20px',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflowX: 'auto',
    },
    sectionHeader: {
        textAlign: 'left',
        width: '100%',
        paddingBottom: '10px',
    }
});


class LifeTimeSelector extends Component {
    state = {}

    componentDidMount = () => {
        let scrollToChip = getAltIndex(this.props.lifetime) + 2
        if(scrollToChip > alternatives.length - 1) {
            scrollToChip = alternatives.length - 1
        }
        let element = document.getElementById('lifetimechip-' + alternatives[scrollToChip].minutes)
        element.scrollIntoView(true)
    }

    render = () => {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={0}>
                <Typography inline={true} className={classes.sectionHeader}>Message lifetime:</Typography>
                <GridList className={classes.gridList} cellHeight={30}>
                    {alternatives.map(chip => (
                        <LifeTimeChip
                            key={chip.minutes}
                            chipData={chip}
                            selected={chip.minutes === this.props.lifetime}
                            chipClicked={this.props.setLifetime}
                        />
                    ), this)}
                </GridList>
            </Paper>
        );
    }
}

LifeTimeSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LifeTimeSelector);