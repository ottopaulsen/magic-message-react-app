import React, { Component } from 'react'
import Messages from './messages'
import { FirebaseContext } from '../firebase'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const lsPrefix = 'Magic-'

const styles = theme => ({
    root: {
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        background: "#212121",
        color: "#dddddd",
        height: "250px",
    },
    screenName: {
        color: "#dddddd",
        paddingBottom: theme.spacing.unit * 2,
    }
});

class Screen extends Component {

    render() {
        const { classes, screen } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={1}>
                    <Typography className={classes.screenName} align="center" variant="h5">
                        {screen.name}
                    </Typography>
                    <FirebaseContext.Consumer>
                        {firebase => <Messages screenKey={screen.key} db={firebase.db} />}
                    </FirebaseContext.Consumer>
                </Paper>
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Screen);