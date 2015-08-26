import React, { Component } from 'react';
import Letter from './Letter';
import Timer from './Timer';
import List from './List';
import words from './data';
import generateWord from './generateWord';
import shuffle from 'array-shuffle';
import imgs from './images';

let getOWord = generateWord(imgs);

export default class Game extends Component {
  constructor(props) {
    super(props);
    let oWord = getOWord();
    
    let word = oWord.word.toLowerCase();
    this.state = {
      word: word,
      imgSrc: oWord.href,
      wordLetter: shuffle(word.split('').map((letter, index) => {
        return {
          index: index,
          text: letter,
          enabled: false
        }
      })),
      answerLetter: [],
      correctAnswer: [],
      score: 0,
      timerMax: 20
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
    //alert(this.state.score + ' score');
  }

  componentDidUpdate() {
    if (this.state.word === this.state.answerLetter.map((letter) => letter.text).join('')) {
      let oWord = getOWord();
      let word = oWord.word.toLowerCase();

      this.setState({
        word: word,
        imgSrc: oWord.href,
        wordLetter: shuffle(word.split('').map((letter, index) => {
          return {
            index: index,
            text: letter,
            enabled: false
          }
        })),
        answerLetter: [],
        correctAnswer: this.state.correctAnswer.concat(this.state.word),
        score: this.state.score + 1,
        timerMax: this.state.timerMax + 4
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
    let host = 'http://4pics1word.ws';
    return (
      <div className='game'>
        <Timer seconds={this.state.timerMax} fnTimerDone={this.handleTimerDone}/>
        <div className='img-container'>
          <img className='img-quiz' src={host + this.state.imgSrc}/>
        </div>
        <div className='letter-container'>{answerLetter}</div>
        <div className='letter-container'>{letters}</div>
        <List list={this.state.correctAnswer}/>
      </div>
    );
  }
};