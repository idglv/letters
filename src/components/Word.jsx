import React, {Component} from 'react';

import Letter from './Letter';

class Word extends Component {
    render() {
        const letters = this.props.letters.map((letter, index) =>
            <div key={index} className="word__letter">
                <Letter
                    onClick={this.props.handleClick}
                    letter={letter}
                    variant={this.props.variant}
                />
            </div>
        );
        return (
            <div className="word">
                {letters}
            </div>
        );
    }
}

export default Word
