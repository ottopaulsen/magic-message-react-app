import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Icon from '@mdi/react'
import { mdiLogout } from '@mdi/js'


const styles = theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        left: 0,
    },
    footerText: {
        color: "#dddddd",
    },
    logoutIcon: {
        color: "#dddddd",
        marginTop: 5,
        marginRight: 10,
    }
});

class Footer extends Component {
    state = {}

    signOut = () => {
        console.log("Logging out")
        this.props.signOut()
    }

    render = () => {
        const { classes } = this.props;
        console.log("Footer render")
        return (
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <table width="100%">
                    <tbody>
                        <tr>
                            <td width="80%">
                                <Typography className={classes.footerText} align="left">
                                    {this.props.text}
                                </Typography>
                            </td>
                            <td width="10%" align="right">
                                <Icon className={classes.logoutIcon}
                                    path={mdiLogout}
                                    size={1}
                                    color="#dddddd"
                                    onClick={this.signOut}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </AppBar>
        );
    }
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
