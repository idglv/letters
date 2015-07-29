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
      })
    }
  }

  handleLetter = (index) => {
    this.setState({
      wordLetter: this.state.wordLetter.map((letter) => {
        return letter.index !== index ? letter : {
          index: letter.index,
          text: letter.text,
          enabled: true
        }
      })
    })
  }

  render () {
    let letters = this.state.wordLetter.map((letter) => 
      <Letter letter={letter.text} onClick={this.handleLetter.bind(this, letter.index)} enabled={letter.enabled}/>
    );
    return (
      <div>
        <Timer start={Date.now()}/>
        {letters}
      </div>
    );
  }
};