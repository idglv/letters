import React, { Component } from 'react';
import Letter from './Letter';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Yo</h1>
        <Letter letter={'A'}/>
        <Letter letter={'B'}/>
        <Letter letter={'C'}/>
        <Letter letter={'D'}/>
      </div>
    );
  }
}
