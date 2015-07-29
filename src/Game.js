import React, { Component } from 'react';
import Letter from './Letter';
import Timer from './Timer';
import words from './data';
import generateWord from './generateWord';
import shuffle from 'array-shuffle';

let getWord = generateWord(words);

export default class Game extends Component {
  constructor(props) {
    super(props);
    let word = getWord();
    this.state = {
      word: word,
      wordLetter: shuffle(word.split('').map((letter, index) => {
        return {
          index: index,
          text: letter,
          enabled: false
        }
      })),
      answerLetter:[],
      score: 0
    }
  }

  handleLetter = (index) => {
    let answer = this.state.answerLetter;
    this.setState({
      wordLetter: this.state.wordLetter.map((letter) => {
        return letter.index !== index ? letter : {
          index: letter.index,
          text: letter.text,
          enabled: true
        }
      }),
      answerLetter: answer.concat(this.state.wordLetter.filter((letter) => letter.index === index))
    })
    
  }

  handleAnswer = (index) => {
    this.setState({
      wordLetter: this.state.wordLetter.map((letter) => {
        return letter.index !== index ? letter : {
          index: letter.index,
          text: letter.text,
          enabled: false
        }
      }),
      answerLetter: this.state.answerLetter.filter((letter) => letter.index !== index)
    });
  }

  handleTimerDone = () => {
    alert(this.state.score + ' score');
  }

  componentDidUpdate() {
    if (this.state.word === this.state.answerLetter.map((letter) => letter.text).join('')) {
      let word = getWord();
      this.setState({
        word: word,
        wordLetter: shuffle(word.split('').map((letter, index) => {
          return {
            index: index,
            text: letter,
            enabled: false
          }
        })),
        answerLetter:[],
        score: this.state.score + 1
      })
    }
  }

  render () {
    let letters = this.state.wordLetter.map((letter) => 
      <Letter letter={letter.text} onClick={this.handleLetter.bind(this, letter.index)} enabled={letter.enabled}/>
    );
    let answerLetter = this.state.answerLetter.map((letter) => 
      <Letter letter={letter.text} onClick={this.handleAnswer.bind(this, letter.index)} enabled={letter.enabled}/>
    );
    let style = {
      height: '5em'
    }
    return (
      <div>
        <Timer start={Date.now()} end={10} fnTimerDone={this.handleTimerDone}/>
        <span>Your score: {this.state.score}</span>
        <div style={style}>{answerLetter}</div>
        <div>{letters}</div>
      </div>
    );
  }
};