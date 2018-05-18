import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DayPicker, { DateUtils } from 'react-day-picker'

class MonthlyPickDays extends Component {
  state = {
    selectedDays: []
  }

  render () {
    const {
      selectedDays
    } = this.state

    return (
      <DayPicker
        selectedDays={selectedDays}
        onDayClick={this.handleDayClick}
        canChangeMonth={false}
        showWeekDays={false}
        month={new Date('01/02/1989')}
      />
    )
  }

  handleDayClick = (day, { selected }) => {
    const { selectedDays } = this.state

    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(selectedIndex, 1)
    } else {
      selectedDays.push(day)
    }

    const daysOnly = selectedDays.reduce((arr, date) => [...arr, date.getUTCDate()], [])
    this.props.handleMonthlyDays(daysOnly)

    this.setState({ selectedDays })
  }
}

MonthlyPickDays.propTypes = {
  handleMonthlyDays: PropTypes.func.isRequired
}

export default MonthlyPickDays
