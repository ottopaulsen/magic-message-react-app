import React, { Component } from 'react'
import Screen from './screen'

class ScreenSlider extends Component {
    state = {}
    constructor(props) {
        super(props)
        this.state = {currentScreenId: 2}
    }
    render() {
        return (
                <Screen screenId={this.state.currentScreenId}/>
        )
    }
}

export default ScreenSlider;