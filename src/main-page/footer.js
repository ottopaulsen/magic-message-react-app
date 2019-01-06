import React, {Component} from 'react'
import {AuthContext} from '../auth'
import { Button } from '@material-ui/core';

class Footer extends Component {
    state = {}
    render() {
        console.log("Footer render")
        return (
            <AuthContext.Consumer>
                {auth =>
                    <footer className='footer'>
                        <div className='title footerpart'>
                            {auth.isAuthenticated() ? "Logged in as " + auth.getUser() : "Not logged in"}
                        </div>
                        <div>
                            <Button onClick={auth.signOut}>Sign out</Button>
                        </div>
                    </footer>
                }
            </AuthContext.Consumer>
        );
    }
}


export default Footer;
