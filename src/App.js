import React, { Component } from 'react';
import Letter from './Letter';
import words from './data';
import generateWord from './generateWord';

let getWord = generateWord(words);

export default class App extends Component {
  render() {
    let letters = getWord().split('').map((l) => <Letter letter={l}/>);
    return (
      <div>
        <h1>Yo</h1>
        {letters}
      </div>
    );
  }
}
