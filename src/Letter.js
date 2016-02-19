import React, { Component } from 'react';

import cx from 'classnames';

export default class Letter extends Component {
  handleClick = (event) => {
    if (this.props.enabled && this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    let props = this.props;

    let letterClass = cx('letter', {
      'letter_enabled': !props.enabled,
      'letter_active': props.enabled,
      'letter_wrong': props.wrong
    })

    return (
      <a
        className={letterClass}
        onClick={this.handleClick}
      >
        {props.letter.toUpperCase()}
      </a>
    );
  }
}
