import React, { Component } from 'react';

class Message extends Component {
    state = {  }
    render() { 
        return ( <div>{this.props.message.sentBy} ({calculateAge(this.props.message.sentTime)}) {this.props.message.message}</div> );
    }
}
 
function calculateAge (time) {
    const t = time.toDate()
    const sec = Math.round((Date.now() - t.getTime()) / 1000)
    if(sec < 60) return 'now'
    const min = Math.round(sec / 60)
    if(min < 60) return min + ' min'
    const h = Math.round(min / 60)
    if(h < 24) return h + ' hours'
    const d = Math.round(h / 24)
    return d + ' days'
}


export default Message;