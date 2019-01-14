import React from 'react';

class InstructionsPage extends React.Component {
    render() {
        return (
                    <div>
                        <h1>Instructions</h1>
                        <p>This app is used to send messages to a <a href="https://magicmirror.builders/">MagicMirror</a>, using the <a href="https://github.com/ottopaulsen/MMM-MessageToMirror" >MMM-MessageToMirror</a> module.</p>
                        <p>You must configure the module with your email address, and start the magicmirror, for this app to be useful.</p>
                    </div>
        );
    }
}

export default InstructionsPage