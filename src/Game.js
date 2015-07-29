import React, { Component } from 'react';
import Letter from './Letter';
import Timer from './Timer';
import words from './data';
import generateWord from './generateWord';

let getWord = generateWord(words);

export default class Game extends Component {
  constructor(props) {
    super(props);
    let word = getWord();
    this.state = {
      word: word,
      wordLetter: word.split('').map((letter, index) => {
        return {
          index: index,
          text: letter,
          enabled: false
        }
      }),
      answerLetter:[]
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

  render () {
    let letters = this.state.wordLetter.map((letter) => 
      <Letter letter={letter.text} onClick={this.handleLetter.bind(this, letter.index)} enabled={letter.enabled}/>
    );
    let answerLetter = this.state.answerLetter.map((letter) => 
      <Letter letter={letter.text} onClick={null} enabled={letter.enabled}/>
    );
    let style = {
      height: '4em'
    }
    return (
      <div>
        <Timer start={Date.now()}/>
        <div style={style}>{answerLetter}</div>
        <div>{letters}</div>
      </div>
    );
  }
};