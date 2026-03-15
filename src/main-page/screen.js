import React, { Component } from 'react'
import Messages from './messages'
import { FirebaseContext } from '../firebase'
import Paper from '@mui/material/Paper';
import { withStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const styles = theme => ({
    paper: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        background: "black",
        color: "#dddddd",
        height: "250px",
    },
    screenLabel: {
        color: theme.palette.text.secondary,
        paddingBottom: theme.spacing(0.5),
    },
    screenName: {
        color: "#dddddd",
        paddingBottom: theme.spacing(2),
    }
});

class Screen extends Component {
    render() {
        const { classes, screen } = this.props;
        return (
            <div className={classes.root}>
                <Typography className={classes.screenLabel} variant="body2">Screen:</Typography>
                <Paper className={classes.paper} elevation={1}>
                    <Typography className={classes.screenName} align="center" variant="h5">
                        {screen.name}
                    </Typography>
                    <FirebaseContext.Consumer>
                        {firebase => <Messages screenKey={screen.key} db={firebase.db} deleteMessage={this.props.deleteMessage} />}
                    </FirebaseContext.Consumer>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Screen);
