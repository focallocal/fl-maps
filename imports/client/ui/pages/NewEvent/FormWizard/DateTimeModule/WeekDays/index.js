import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CustomInput } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class WeekDays extends Component {
  render () {
    const {
      schemaKey,
      selectedDays
    } = this.props

    return (
      <div className='weekdays'>
        {weekDays.map((day, index) => {
          const checked = !!selectedDays[index]

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
      schemaKey,
      selectedDays
    } = this.props

    const day = target.id.split('-')[1]
    const index = weekDays.findIndex(d => d === day)

    if (selectedDays[index]) {
      let updatedDays = [...selectedDays]
      updatedDays.splice(index, 1, null)

      form.change(schemaKey, updatedDays)
    } else {
      // Check day
      form.change(`${schemaKey}.${index}.day`, day)
    }
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
