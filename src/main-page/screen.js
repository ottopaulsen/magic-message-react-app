import React, { Component } from 'react'
import Messages from './messages'
import {FirebaseContext} from '../firebase'

class Screen extends Component {
    render() {
        return (
            <div class="message-screen">
                <h1>{this.props.screen.name}</h1>
                <FirebaseContext.Consumer>
                    {firebase => <Messages screenKey={this.props.screen.key} db={firebase.db} />}
                </FirebaseContext.Consumer>
            </div>
        )
    }
}

export default Screen;