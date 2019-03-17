import React, { Component } from "react";
import "./switch.css";

class Switch extends Component {
  render() {
    return (
      <label className="switch">
        {this.props.text}
        <input
          checked={this.props.checked}
          type="checkbox"
          onChange={this.props.onChange}
        />
        <span className="slider round" />
      </label>
    );
  }
}

export default Switch;
