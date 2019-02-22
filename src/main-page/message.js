import React, { Component } from 'react';

class Message extends Component {
    state = {}
    render() {
        const messageClass = "message-message-col" + (this.props.message.receipt ? "" : " not_confirmed")
        return (
            <tr className="message-row">
                <td className="message-from-col">{this.props.message.sentBy} ({calculateAge(this.props.message.sentTime)})</td>
                <td className={messageClass}>{this.props.message.message}</td>
                <td className="message-icon-col"></td>
            </tr>
        );
    }
}

function calculateAge(time) {
    const t = time.toDate()
    const sec = Math.round((Date.now() - t.getTime()) / 1000)
    if (sec < 60) return 'now'
    const min = Math.round(sec / 60)
    if (min < 60) return min + ' min'
    const h = Math.round(min / 60)
    if (h < 24) return h + ' hours'
    const d = Math.round(h / 24)
    return d + ' days'
}


export default Message;