import React, { Component } from 'react'

export default class DurationPicker extends Component {

  constructor(props) {
    super(props)
    this.state = { value: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  translate = (key) => {
    return this.props.translations[key]
  }

  updateState = (value) => {
    let total = parseInt(value, 10)
    const seconds = total % 60
    total = Math.floor(total / 60)
    const minutes = total % 60
    total = Math.floor(total / 60)
    let hours, days

    if (this.props.showDays) {
      hours = total % 24
      days = Math.floor(total / 24)
    } else {
      hours = total
      days = 0
    }

    this.setState({ value, days, hours, minutes, seconds })
  }

  buildDisplayBlock(key, hidden, max) {
    if (!hidden) {
      return (
        <div className="bdp-block">
          <input className="form-control input-sm" type="number" min="0" value="0" max={max} />
          <div>{this.translate(key)}</div>
        </div>
      )
    }
  }

  render() {
    return(
      <div className="bdp-input">
        {this.buildDisplayBlock('days', this.props.showDays)}
        {this.buildDisplayBlock('hours', false, this.props.showDays ? 23 : null)}
        {this.buildDisplayBlock('minutes', false, 59)}
        {this.buildDisplayBlock('seconds', this.props.showSeconds, 59)}
      </div>
    )
  }
}

DurationPicker.defaultProps = {
  translations: {
    day: 'day',
    hour: 'hour',
    minute: 'minute',
    second: 'second',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
  },
  showSeconds: false,
  showDays: true,
};
