import React, { Component } from 'react';
import Message from './message'

class Messages extends Component {
    state = {
        messages: [],
        timeNow: new Date(),
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

        this.interval = setInterval(() => {
            this.setState({ timeNow: new Date() })
        }, 5000)
    }

    componentWillUnmount = () => {
        this.unsubscribe()
        clearInterval(this.interval)
    }

    showMessage = message => {
        const sentTime = message.sentTime.toDate().valueOf()
        return ((sentTime + message.validMinutes * 60000) > Date.now())
    }

    render = () => {
        return (
            <table className="message-list"><tbody>{this.state.messages.map(message => (
                this.showMessage(message.data()) ? (<Message key={message.id} message={message} deleteMessage={this.props.deleteMessage}/>) : (null)
            ))}</tbody></table>
        );
    }
}

export default Messages;