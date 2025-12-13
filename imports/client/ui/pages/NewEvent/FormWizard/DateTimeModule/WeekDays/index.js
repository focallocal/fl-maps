import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Label, FormGroup } from 'reactstrap'
import { Input } from 'reactstrap'
import Select from 'react-select'
import possibleEventHours from '/imports/both/collections/events/helpers/possibleEventHours'
import { formatReactSelectOptions } from '/imports/client/utils/format'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const timeOptions = formatReactSelectOptions(possibleEventHours)

// Get default times in HH:mm format for new day entries
function getDefaultStartTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const mins = now.getMinutes() >= 30 ? '30' : '00'
  return `${hours}:${mins}`
}

function getDefaultEndTime() {
  const now = new Date()
  now.setHours(now.getHours() + 1)
  const hours = now.getHours().toString().padStart(2, '0')
  const mins = now.getMinutes() >= 30 ? '30' : '00'
  return `${hours}:${mins}`
}

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

        {/* Time selectors for checked days - inline layout */}
        {selectedDayEntries.length > 0 && (
          <div className='day-times'>
            {selectedDayEntries.map((entry, idx) => {
              const startValue = entry.startingTime 
                ? timeOptions.find(opt => opt.value === entry.startingTime) 
                : null
              const endValue = entry.endingTime 
                ? timeOptions.find(opt => opt.value === entry.endingTime) 
                : null

              return (
                <div key={entry.day} className='day-time-row'>
                  <Label className='day-label'>{entry.day}</Label>
                  <div className='hours'>
                    <Select
                      className='time-select'
                      classNamePrefix='time-select'
                      value={startValue}
                      options={timeOptions}
                      onChange={(opt) => this.handleTimeChange(entry.day, 'startingTime', opt?.value || '')}
                      isSearchable={false}
                      placeholder='From'
                      menuPlacement='auto'
                    />
                    <span className='time-separator'>-</span>
                    <Select
                      className='time-select'
                      classNamePrefix='time-select'
                      value={endValue}
                      options={timeOptions}
                      onChange={(opt) => this.handleTimeChange(entry.day, 'endingTime', opt?.value || '')}
                      isSearchable={false}
                      placeholder='To'
                      menuPlacement='auto'
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
      // Add the day with default times (HH:mm format required by schema)
      updatedDays = [...selectedDays.filter(entry => entry && entry.day), { 
        day, 
        startingTime: getDefaultStartTime(), 
        endingTime: getDefaultEndTime() 
      }]
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
