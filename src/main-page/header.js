import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import 'typeface-monda';

class Header extends Component {
    state = {}
    render() {
        return (
            <div>
                <Typography variant="h5" align="center">
                    Send Magic Message
                </Typography>
            </div>
        );
    }
}

export default Header;