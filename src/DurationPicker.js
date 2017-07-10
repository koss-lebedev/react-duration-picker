import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    this.props.onChange(value)
  }

  buildDisplayBlock(key, max) {
    return (
      <div className="bdp-block">
        <input className="form-control input-sm" type="number" min="0" value="0" max={max} />
        <div>{this.translate(key)}</div>
      </div>
    )
  }

  render() {
    return(
      <div className="bdp-input">
        {this.props.showDays && this.buildDisplayBlock('days')}
        {this.buildDisplayBlock('hours', this.props.showDays ? 23 : null)}
        {this.buildDisplayBlock('minutes', 59)}
        {this.props.showSeconds && this.buildDisplayBlock('seconds', 59)}
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
}

DurationPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  showSeconds: PropTypes.bool,
  showDays: PropTypes.bool,
}
