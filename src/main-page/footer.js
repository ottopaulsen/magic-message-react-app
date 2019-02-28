import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        // maxWidth: 400,
        left: 0,
    },
});

class Footer extends Component {
    state = {}
    render() {
        const { classes } = this.props;
        console.log("Footer render")
        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <div align="center">{this.props.text}</div>
            </AppBar>
        );
    }
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
