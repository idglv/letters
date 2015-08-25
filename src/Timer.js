import React, { Component } from 'react';
import TransitiveNumber from 'react-transitive-number';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      start: Date.now() + this.props.seconds * 1000,
      now: Date.now()
    };
  }

  tick = () => {
    this.setState({
      elapsed: (this.state.start) - new Date(),
      start: this.state.now + this.props.seconds * 1000
    });
    if (this.state.start <= new Date()) {
      clearInterval(this.timer);
      this.props.fnTimerDone();
    }
  }

  componentDidMount () {
    this.timer = setInterval(this.tick, 50);
  }

  componentDidUnmount () {
    clearInterval(this.timer);
  }

  seconds = () => {
    let elapsed = this.state.elapsed / 100;
    return (elapsed / 10).toFixed(1);
  }

  render () {
    let seconds = '' + this.seconds();
    let getClassColor = (seconds) => {
      let total = this.props.seconds;
      if (+seconds < 5) return " timer_red";
      if (+seconds < 10) return " timer_yellow";
      return " timer_green";
    }

    let className = 'timer' + getClassColor(seconds);

    return (
      <div className={className}>
        <TransitiveNumber>{Math.abs(seconds.split('.')[0])}</TransitiveNumber>.{seconds.split('.')[1]}
      </div>
    );
  }
}