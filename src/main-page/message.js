import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

class Message extends Component {
    state = {}

    deleteMessage = () => {
        console.log('Deleting message id ', this.props.message.id)
        this.props.deleteMessage(this.props.message.ref.path)
    }

    render = () => {
        const data = this.props.message.data()
        const messageClass = "message-message-col" + (data.receipt ? "" : " not_confirmed")
        return (
            <tr className="message-row">
                <td className="message-from-col">{data.sentBy} ({calculateAge(data.sentTime)})</td>
                <td className={messageClass}>{data.message}</td>
                <td className="message-icon-col">
                    <DeleteIcon className="message-icon-delete" fontSize="small" onClick={this.deleteMessage} />
                </td>
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