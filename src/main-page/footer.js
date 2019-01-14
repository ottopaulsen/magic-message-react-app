import React, { Component } from 'react'

class Footer extends Component {
    state = {}
    render() {
        console.log("Footer render")
        return (
            <footer className='footer'>
                <div className='title footerpart'>
                    {this.props.text}
                </div>
                {/* <div>
                    <Button onClick={this.props.auth.signOut}>Sign out</Button>
                </div> */}
            </footer>
        );
    }
}


export default Footer;
