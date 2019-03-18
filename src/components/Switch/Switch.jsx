import React from "react";
import "./switch.css";

export default function Switch(props) {
    return (
      <label className="switch">
        {props.text}
        <input
          checked={props.checked}
          type="checkbox"
          onChange={props.onChange}
        />
        <span className="slider round" />
      </label>
    );
}
