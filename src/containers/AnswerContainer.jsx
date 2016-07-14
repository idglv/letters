import React, {Component} from 'react';
import { connect } from 'react-redux'

import Word from '../components/Word'
import { answerClick } from '../actions'

class AnswerContainer extends Component {
    render() {
        return (
            <Word letters={this.props.answer} handleClick={this.props.answerClick} variant="answer"/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        answer: state.answer || []
    };
}

export default connect(mapStateToProps, {
    answerClick
})(AnswerContainer)

