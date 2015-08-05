import React, { Component } from 'react';

export default class List extends Component {
  render() {
    let list = this.props.list.map((el) => <li>{el}</li>);
    return (
      <ul>
        {list}
      </ul>
    );
  }
}
