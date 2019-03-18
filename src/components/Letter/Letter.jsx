import React from "react";
import "./letter.css";
import cx from "classnames";

export default function Letter (props) {
    const { index, value, selected, wrong, onClick } = props;

    const letterClass = cx("letter", {
      letter_selected: selected,
      letter_active: !selected,
      letter_wrong: wrong
    });

    return (
      <div
        data-index={index}
        className={letterClass}
        onClick={onClick}
      >
        {value.toUpperCase()}{" "}
      </div>
    );
}
