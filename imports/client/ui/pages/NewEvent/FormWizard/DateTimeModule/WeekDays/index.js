import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Input, Label, FormGroup } from 'reactstrap'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class WeekDays extends Component {
  render () {
    const {
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
              <FormGroup check inline key={index}>
                <Input
                  id={'day-' + day}
                  type='checkbox'
                  checked={isChecked}
                  onChange={() => this.handleDayChange(day)}
                />
                <Label check for={'day-' + day}>{day.substr(0, 3)}</Label>
              </FormGroup>
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

    // Update the entire 'when' object since form.change doesn't handle nested paths
    const currentWhen = form.getModel().when || {}
    const updatedWhen = { ...currentWhen, days: updatedDays }
    form.change('when', updatedWhen)
  }

  handleTimeChange = (day, field, value) => {
    const {
      form,
      selectedDays
    } = this.props

    const updatedDays = selectedDays.map(entry => {
      if (entry && entry.day === day) {
        return { ...entry, [field]: value }
      }
      return entry
    })

    // Update the entire 'when' object since form.change doesn't handle nested paths
    const currentWhen = form.getModel().when || {}
    const updatedWhen = { ...currentWhen, days: updatedDays }
    form.change('when', updatedWhen)
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
