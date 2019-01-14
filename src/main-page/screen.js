import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class Screen extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    Screen {this.props.screen.name} comes here.<br />
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        )
    }
}

export default Screen;