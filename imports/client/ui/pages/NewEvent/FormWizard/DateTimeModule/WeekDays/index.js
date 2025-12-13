import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { CustomInput, Input, Label } from 'reactstrap'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class WeekDays extends Component {
  render () {
    const {
      schemaKey,
      selectedDays,
      form
    } = this.props

    // Get the selected days that have time data
    const selectedDayEntries = selectedDays.filter(entry => entry && entry.day)

    return (
      <div className='weekdays'>
        {/* Day checkboxes in a row */}
        <div className='day-checkboxes'>
          {weekDays.map((day, index) => {
            const isChecked = selectedDayEntries.some(entry => entry.day === day)

            return (
              <CustomInput
                key={index}
                id={'day-' + day}
                className='checkbox'
                type='checkbox'
                label={day.substr(0, 3)}
                checked={isChecked}
                onChange={() => this.handleDayChange(day)}
              />
            )
          })}
        </div>

        {/* Time selectors for checked days */}
        {selectedDayEntries.length > 0 && (
          <div className='day-times'>
            {selectedDayEntries.map((entry, idx) => {
              return (
                <div key={entry.day} className='day-time-row'>
                  <Label className='day-label'>{entry.day}</Label>
                  <div className='hours'>
                    <Input
                      type="time"
                      value={entry.startingTime || ''}
                      onChange={(e) => this.handleTimeChange(entry.day, 'startingTime', e.target.value)}
                    />
                    <span className='time-separator'>-</span>
                    <Input
                      type="time"
                      value={entry.endingTime || ''}
                      onChange={(e) => this.handleTimeChange(entry.day, 'endingTime', e.target.value)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  handleDayChange = (day) => {
    const {
      form,
      schemaKey,
      selectedDays
    } = this.props

    const existingIndex = selectedDays.findIndex(entry => entry && entry.day === day)
    let updatedDays

    if (existingIndex >= 0) {
      // Remove the day
      updatedDays = selectedDays.filter(entry => entry && entry.day !== day)
    } else {
      // Add the day with default times
      updatedDays = [...selectedDays.filter(entry => entry && entry.day), { day, startingTime: '', endingTime: '' }]
      // Sort by weekday order
      updatedDays.sort((a, b) => weekDays.indexOf(a.day) - weekDays.indexOf(b.day))
    }

    form.change(schemaKey, updatedDays)
  }

  handleTimeChange = (day, field, value) => {
    const {
      form,
      schemaKey,
      selectedDays
    } = this.props

    const updatedDays = selectedDays.map(entry => {
      if (entry && entry.day === day) {
        return { ...entry, [field]: value }
      }
      return entry
    })

    form.change(schemaKey, updatedDays)
  }
}

WeekDays.defaultProps = {
  selectedDays: []
}

WeekDays.propTypes = {
  selectedDays: PropTypes.array.isRequired,
  schemaKey: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired
}

export default WeekDays
