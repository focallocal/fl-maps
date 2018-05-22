import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CustomInput } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class WeekDays extends Component {
  render () {
    const {
      selectedDays,
      schemaKey
    } = this.props

    return (
      <div className='weekdays'>
        {weekDays.map((day, index) => {
          return (
            <div key={index} className='day'>
              <CustomInput
                id={'day-' + day}
                className='checkbox'
                type='checkbox'
                label={day.substr(0, 3)}
                checked={!!selectedDays.find(d => d.day === day)}
                onChange={this.handleDayChange}
              />
              <div className='hours'>
                <AutoField name={schemaKey + '.' + index + '.startingTime'} />
                <span>-</span>
                <AutoField name={schemaKey + '.' + index + '.endingTime'} />
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
      selectedDays
    } = this.props

    const day = target.id.split('-')[1]
    const index = weekDays.findIndex(d => d === day)

    if (selectedDays[index]) {
      let updatedDays = [...selectedDays]
      updatedDays.splice(index, 1)

      form.change(`when.specificPeriod.days`, updatedDays)
    } else {
      // Check day
      form.change(`when.specificPeriod.days.${index}.day`, day)
    }
  }
}

WeekDays.propTypes = {
  selectedDays: PropTypes.array.isRequired,
  schemaKey: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired
}

export default WeekDays
