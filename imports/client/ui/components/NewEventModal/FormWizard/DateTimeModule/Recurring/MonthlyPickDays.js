import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DayPicker, { DateUtils } from 'react-day-picker'

class MonthlyPickDays extends Component {
  state = {
    selectedDays: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.selectedDays && !prevState.selectedDays) {
      return {
        selectedDays: transformDaysToDates(nextProps.selectedDays)
      }
    }

    return null
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

function transformDaysToDates (days) {
  return days.reduce((arr, day) => arr.concat(new Date('01/' + day + '/1989')), [])
}

MonthlyPickDays.propTypes = {
  selectedDays: PropTypes.array.isRequired,
  handleMonthlyDays: PropTypes.func.isRequired
}

export default MonthlyPickDays
