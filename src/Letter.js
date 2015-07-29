import React, { Component } from 'react';

export default class Letter extends Component {
  render() {
    let className = "letter";
    if (this.props.enabled)  {
      className += " letter--enabled";
    }
    return (
      <a className={className} onClick={this.props.onClick}>{this.props.letter}</a>
    );
  }
}
