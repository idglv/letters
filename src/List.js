import React, { Component } from 'react';

export default class List extends Component {
  render() {
    let list = this.props.list.map((el) => <div className='answer-list__word'>{el}</div>);
    return (
      <div className='answer-list'>
        {list}
      </div>
    );
  }
}
