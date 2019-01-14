import React, { Component } from 'react';
import Screen from './screen'

class MagicScreens extends Component {
    render() {
        let screens = this.props.screens || [];
        return (
            <div>
                {screens.map((screen) =>
                    <Screen key={screen.key} screen={screen} />
                )}
            </div>
        );
    }
}

export default MagicScreens