import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {elapsed: 0};
  }

  tick = () => {
    this.setState({elapsed: new Date() - this.props.start});
  }

  componentDidMount () {
    this.timer = setInterval(this.tick, 50);
  }

  componentDidUnmount () {
    clearInterval(this.timer);
  }

  render () {
    let elapsed = this.state.elapsed / 100;
    let seconds = (elapsed / 10).toFixed(1);

    return (
      <div className='timer'>{seconds}</div>
    );
  }
}