import React, { Component } from 'react';

export default class Letter extends Component {
  render() {
    return (
      <a className='letter'>{this.props.letter}</a>
    );
  }
}
