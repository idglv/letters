import React, {Component} from 'react';
import { connect } from 'react-redux'

import Image from '../components/Image';
import LettersContainer from './LettersContainer'
import AnswerContainer from './AnswerContainer'
import { setLetters, imageChange } from '../actions'
import { newVariant } from '../utils/word'

class App extends Component {
    constructor(props) {
        super(props)

        this.props.imageChange({
            "src": "https://heavyeditorial.files.wordpress.com/2014/06/tiny.jpg?quality=65&amp;strip=all",
            "word": "tiny"
        });

        function convert(word) {
            return word.split('').map(letter => ({
                id: uuid.v1(),
                value: letter,
                disabled: false
            }));
        }

        function addRandom(letters, len) {
            var result = [].concat(letters);
            var variants = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            for (var i = 0; i < len - letters.length; i++) {
                result.push({
                    id: uuid.v1(),
                    value: variants[random(variants.length - 1)],
                    disabled: false
                });
            }
            return shuffle(result);
        }

        this.props.setLetters(newVariant('tiny', 20));
    }

    render() {
        return (
            <div className="app">
                <Image src={this.props.src}/>
                <AnswerContainer/>
                <LettersContainer/>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        src: state.image.src
    };
}

export default connect(mapStateToProps, {
    imageChange,
    setLetters
})(App)
