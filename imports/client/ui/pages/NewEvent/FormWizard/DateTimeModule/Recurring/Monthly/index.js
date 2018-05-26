import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

class RecurrMonthly extends Component {
  render () {
    const {
      startingDate,
      monthly = {}
    } = this.props

    const options = this.getOptionsFromDate(startingDate)
    const value = options.find(option => {
      return monthly ? option.value === monthly.type : false
    })

    return (
      <div id='recurr-monthly'>
        <Select
          value={value || options[0]}
          options={options}
          onChange={this.handleChange}
        />
      </div>
    )
  }

  handleChange = ({ value }) => {
    const {
      form,
      startingDate
    } = this.props

    const dayInMonth = startingDate.getDate()

    let finalValue
    if (value === 'byDayInMonth') {
      finalValue = dayInMonth
    } else {
      finalValue = this.determinePosition(startingDate, dayInMonth)[0] // get first letter which represents the position
    }

    form.change('when.recurring.monthly', { type: value, value: finalValue })
  }

  getOptionsFromDate = (date) => {
    const dayInMonth = date.getDate()
    const position = this.determinePosition(dayInMonth)

    return [
      { value: 'byDayInMonth', label: 'Monthly on day ' + dayInMonth },
      { value: 'byPosition', label: 'Monthly on the ' + position + ' ' + weekdaysMap[date.getDay()] }
    ]
  }

  determinePosition (month) {
    let position

    if (month <= 7) {
      position = '1st'
    } else if (month > 7 && month <= 14) {
      position = '2nd'
    } else if (month > 14 && month <= 21) {
      position = '3rd'
    } else {
      position = '4th'
    }

    return position
  }
}

const weekdaysMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
}

RecurrMonthly.propTypes = {
  form: PropTypes.object.isRequired,
  startingDate: PropTypes.object.isRequired
}

export default RecurrMonthly
