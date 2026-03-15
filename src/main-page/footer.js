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
        color: theme.palette.text.primary,
    },
    logoutIcon: {
        color: theme.palette.text.secondary,
        marginTop: 5,
        marginRight: 10,
    }
});

class Footer extends Component {
    state = {}

    signOut = () => {
        this.props.signOut()
    }

    render = () => {
        const { classes } = this.props;
        return (
            <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0, backgroundColor: 'white' }}>
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
                                    color="#555555"
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
