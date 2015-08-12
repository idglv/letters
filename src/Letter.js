import React, { Component } from 'react';

export default class Letter extends Component {
  render() {
    let className = "letter";
    let fnClick = this.props.onClick;
    if (this.props.enabled)  {
      className += " letter_enabled";
      fnClick = null;
    } else {
      className += " letter_active";
    }
    return (
      <a className={className} onClick={fnClick}>{this.props.letter}</a>
    );
  }
}
