import React, { Component } from 'react';

export default class Letter extends Component {
  render() {
    return (
      <a>{this.props.letter}</a>
    );
  }
}
