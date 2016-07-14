import React, {Component} from 'react'
import cx from 'classNames'

export default class Letter extends Component {
    render() {
        const { onClick, variant }  = this.props;
        const { id, value, disabled } = this.props.letter;

        var letterClass = cx('letter', {
            letter_disabled: disabled,
            letter_active: !disabled,
            letter_answer: variant === 'answer'
        });

        return (
            <div
                className={letterClass}
                onClick={() => !disabled && onClick(id, value)}
            >
                {value}
            </div>
        )
    }
}
