import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { CustomInput, Input } from 'reactstrap'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class WeekDays extends Component {
  render () {
    const {
      schemaKey,
      selectedDays,
      form
    } = this.props

    return (
      <div className='weekdays'>
        {weekDays.map((day, index) => {
          const checked = Boolean(selectedDays[index]);
          const formData = form.getModel()
          const dayData = formData[schemaKey.split('.')[0]]?.[schemaKey.split('.')[1]]?.[index] || {}

          return (
            <div key={index} className='day'>
              <CustomInput
                id={'day-' + day}
                className='checkbox'
                type='checkbox'
                label={day.substr(0, 3)}
                checked={checked}
                onChange={this.handleDayChange}
              />
              <div className='hours'>
                <Input
                  type="time"
                  name={`${schemaKey}.${index}.startingTime`}
                  value={dayData.startingTime || ''}
                  onChange={(e) => {
                    let updatedDays = [...selectedDays];
                    updatedDays[index] = { ...updatedDays[index], day };
                    updatedDays[index].startingTime = e.target.value;
                    form.change(schemaKey, updatedDays.filter(entry => entry !== undefined));
                  }}
                />
                <span>-</span>
                <Input
                  type="time"
                  name={`${schemaKey}.${index}.endingTime`}
                  value={dayData.endingTime || ''}
                  onChange={(e) => {
                    let updatedDays = [...selectedDays];
                    updatedDays[index] = { ...updatedDays[index], day };
                    updatedDays[index].endingTime = e.target.value;
                    form.change(schemaKey, updatedDays.filter(entry => entry !== undefined));
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  handleDayChange = ({ target }) => {
    const {
      form,
      schemaKey,
      selectedDays
    } = this.props

    const day = target.id.split('-')[1]
    const index = weekDays.findIndex(d => d === day)

    let updatedDays = [...selectedDays];

    if (updatedDays[index]) {
      updatedDays.splice(index, 1); // Properly remove the element
    } else {
      updatedDays[index] = { day };
    }

    form.change(schemaKey, updatedDays.filter(entry => entry !== undefined)); // Ensure no null/undefined elements
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
