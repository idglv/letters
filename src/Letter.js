import React, { Component } from 'react';

export default class Letter extends Component {
  render() {
    let className = "letter";
    let fnClick = this.props.onClick;
    if (this.props.enabled)  {
      className += " letter--enabled";
      fnClick = null;
    } else {
      className += " letter--active";
    }
    return (
      <a className={className} onClick={fnClick}>{this.props.letter}</a>
    );
  }
}
