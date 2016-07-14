import React, {Component} from 'react';
import { connect } from 'react-redux'

import Word from '../components/Word'
import { letterClick } from '../actions'

class LettersContainer extends Component {
    render() {
        return (
            <Word letters={this.props.letters} handleClick={this.props.letterClick}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        letters: state.letters || []
    };
}

export default connect(mapStateToProps, {
    letterClick
})(LettersContainer)

