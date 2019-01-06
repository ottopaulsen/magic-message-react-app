import React, { Component } from 'react'
import { Button } from '@material-ui/core';

class Footer extends Component {
    state = {}
    render() {
        console.log("Footer render")
        return (
            <footer className='footer'>
                <div className='title footerpart'>
                    {this.props.auth.isAuthenticated() ? "Logged in as " + this.props.auth.getUser() : "Not logged in"}
                </div>
                <div>
                    <Button onClick={this.props.auth.signOut}>Sign out</Button>
                </div>
            </footer>
        );
    }
}


export default Footer;
