import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { CustomInput } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const WeekDays = ({ selectedDays, schemaKey, form, context }) => (
  weekDays.map((day, index) => {
    return (
      <div key={index} className='day'>
        <CustomInput
          id={day}
          className='checkbox'
          type='checkbox'
          label={day.substr(0, 3)}
          checked={selectedDays.includes(day)}
          onChange={() => handleDayChange(day, index, form, selectedDays, context)}
        />
        <div className='hours'>
          <AutoField name={schemaKey + '.' + index + '.startingTime'} />
          <span>-</span>
          <AutoField name={schemaKey + '.' + index + '.endingTime'} />
        </div>
      </div>
    )
  })
)

function handleDayChange (day, index, form, selectedDays, context) {
  let selectedDays_ = [...selectedDays]

  if (selectedDays_.includes(day)) {
    // Uncheck day
    selectedDays_[index] = null

    // Delete the day object from form's model
    let days = [...form.getModel().when.specificPeriod.days]
    days.splice(index, 1, null)

    // Update model
    form.change('when.specificPeriod.days', days)
  } else {
    // Check day
    form.change(`when.specificPeriod.days.${index}.day`, day)
    selectedDays_[index] = day
  }

  context.setState({ selectedDays: selectedDays_ })
}

WeekDays.propTypes = {
  selectedDays: PropTypes.array.isRequired,
  schemaKey: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

export default WeekDays
