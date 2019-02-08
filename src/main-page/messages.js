import React, { Component } from 'react';
import Message from './message'

class Messages extends Component {
    state = {
        messages: []
    }

    constructor(props) {
        super(props)

        const self = this

        this.unsubscribe = this.props.db.collection('/screens/' + this.props.screenKey + '/messages')
        .onSnapshot(function(snapshot) {
            let messages = []
            snapshot.forEach(message => {
                messages.push(message)
            })
            self.setState({messages})
        }, function(error) {
            console.log('Error getting messages: ', error)
        })
    }

    componentWillUnmount = () => {
        this.unsubscribe()
    }

    render = () => { 

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