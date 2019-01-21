import React, { Component } from 'react'
import Messages from './messages'
import { FirebaseContext } from '../firebase'
import LifeTimeSelector from './lifetimeselector'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const lsPrefix = 'Magic-'

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
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

    constructor(props) {
        super(props)
        this.lsKeyLifetime = lsPrefix + 'lifetime-' + this.props.screen.name
        this.state = { lifetime: localStorage.getItem(this.lsKeyLifetime) || 15 }
    }

    setLifetime = (minutes) => {
        this.setState({ lifetime: minutes })
        localStorage.setItem(this.lsKeyLifetime, minutes)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.paper} elevation={1}>
                    <Typography className={classes.screenName} align="center" variant="h5">
                        {this.props.screen.name}
                    </Typography>
                    <FirebaseContext.Consumer>
                        {firebase => <Messages screenKey={this.props.screen.key} db={firebase.db} />}
                    </FirebaseContext.Consumer>
                </Paper>
                <LifeTimeSelector />
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Screen);