import React, { Component } from 'react';
import Letter from './Letter';
import List from './List';
import util from './Util';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, util.getNewWord(), {
      load: true,
      wrong: false,
      answerLetter: [],
      correctAnswer: []
    });
  }

  handleLetter = (index) => {
    let answer = this.state.answerLetter;
    let letters = this.state.wordLetter;
    this.setState({
      wordLetter: util.changeEnabled(letters, index),
      answerLetter: util.addLetter(answer, letters, index)
    });
  }

  handleAnswer = (index) => {
    let answer = this.state.answerLetter;
    let letters = this.state.wordLetter;
    this.setState({
      wordLetter: util.changeEnabled(letters, index),
      answerLetter: util.removeLetter(answer, index),
      wrong: false
    });
  }

  componentDidUpdate() {
    if (this.state.word === this.state.answerLetter.map((letter) => letter.text).join('')) {
      this.setState(
        Object.assign({}, util.getNewWord(), {
          load: true,
          wrong: false,
          answerLetter: [],
          correctAnswer: this.state.correctAnswer.concat(this.state.word)
        })
      );
    } else if (!this.state.wrong && this.state.answerLetter.length === this.state.word.length) {
      this.setState({
        wrong: true
      });
    }
  }

  render () {
    let isAnswerSpace = this.state.answerLetter.length < this.state.word.length;

    let letters = this.state.wordLetter.map((letter) =>
      <Letter
        letter={letter.text}
        onClick={() => this.handleLetter(letter.index)}
        enabled={isAnswerSpace && letter.enabled}
      />
    );
    let answerLetter = this.state.answerLetter.map((letter) =>
      <Letter
        letter={letter.text}
        onClick={() => this.handleAnswer(letter.index)}
        enabled={letter.enabled}
        wrong={this.state.wrong}
      />
    );

    let handleImgLoad = () => this.setState({
      load: false
    });

    let loadStyle = this.state.load ? {opacity: .3} : {};
    return (
      <div className='game' style={loadStyle}>
        <div className='img-container'>
          <img className='img-quiz' src={this.state.imgSrc} onLoad={handleImgLoad}/>
        </div>
        <div className='letter-container letter-container_answer'>{answerLetter}</div>
        <div className='letter-container'>{letters}</div>
        <List list={this.state.correctAnswer}/>
      </div>
    );
  }
}
