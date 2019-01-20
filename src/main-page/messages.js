import React, { Component } from 'react';
import Message from './message'

class Messages extends Component {
    state = {
        messages: []
    }

    constructor(props) {
        super(props)

        const self = this

        this.props.db.collection('/screens/' + this.props.screenKey + '/messages')
        .get()
        .then(snapshot => {
            let messages = []
            snapshot.forEach(message => {
                messages.push(message)
            })
            self.setState({messages})
        })
    }

    render() { 

        return ( 
            <div className="message-list">{this.state.messages.map(message => (
                <div key={message.id}>
                    <Message message={message.data()}/>
                </div>
            ))}</div>
         );
    }
}
 
export default Messages;