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
            .orderBy("sentTime", "desc")
            .onSnapshot(function (snapshot) {
                let messages = []
                snapshot.forEach(message => {
                    messages.push(message)
                })
                self.setState({ messages })
            }, function (error) {
                console.log('Error getting messages: ', error)
            })
    }

    componentWillUnmount = () => {
        this.unsubscribe()
    }

    render = () => {

        return (
            <table className="message-list"><tbody>{this.state.messages.map(message => (
                <Message key={message.id} message={message.data()} />
            ))}</tbody></table>
        );
    }
}

export default Messages;