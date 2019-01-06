import React, { Component } from 'react'
import Card from '@material-ui/core/Card';

class Screen extends Component {
    render() {
        return (
                <Card>
                        Screen {this.props.screenId} comes here.<br/>
                        <br/>
                        Next: Authentication must be something in app. When auth is changed, change values in app state.
                </Card>
        )
    }
}

export default Screen;