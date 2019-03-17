import React, { Component } from "react";
import "./letter.css";
import cx from "classnames";

class Letter extends Component {
  handleLetterClick = event => {
    !this.props.disabled && this.props.onClick(event);
  };
  render() {
    const { index, value, selected, wrong } = this.props;

    const letterClass = cx("letter", {
      letter_selected: selected,
      letter_active: !selected,
      letter_wrong: wrong
    });

    return (
      <div
        data-index={index}
        className={letterClass}
        onClick={this.handleLetterClick}
      >
        {value.toUpperCase()}{" "}
      </div>
    );
  }
}

export default Letter;
