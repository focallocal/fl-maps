import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CustomInput } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import ErrorField from '/imports/client/utils/uniforms-custom/ErrorField'
import Recurring from './DateTimeModule/Recurring'
import WeekDays from './DateTimeModule/WeekDays'
import SameDateHours from './SameDateHours'

class SecondStep extends Component {
  render () {
    const {
      form
    } = this.props

    const CheckBox = this.CheckBox

    const {
      days,
      multipleDays,
      repeat
    } = form.getModel().when

    return (
      <div id='second-step'>

        {/* Dates and Hours */}
        <div className='dates-hours inline-inputs hide-labels'>
          <div>
            <AutoField name='when.startingDate' />
            {!multipleDays && <AutoField name='when.startingTime' />}
          </div>

          <span className='between'>to</span>

          <div>
            {!repeat && <AutoField name='when.endingDate' />}
            {!multipleDays && <AutoField name='when.endingTime' />}
          </div>
        </div>

        {/* Weekdays  */}
        <CheckBox
          id='multipleDays'
          label='More then one day'
          value={multipleDays}
          type='radio'
        />
        {multipleDays && (
          <div className='week-days'>
            <ErrorField name='when.days' errorMessage='Please select at least 1 day' />
            <SameDateHours
              form={form}
              schemaKey={'when.days'}
            />
            <WeekDays
              form={form}
              schemaKey={'when.days'}
              selectedDays={days}
            />
          </div>
        )}

        {/* Repetition */}
        <CheckBox
          id='repeat'
          label='Custom recurrence'
          value={repeat}
          type='radio'
        />
        {repeat && <Recurring form={form} />}

      </div>
    )
  }

  CheckBox = ({ label, id, value, type }) => (
    <CustomInput
      id={id}
      type={type}
      label={label}
      checked={value === undefined ? false : value}
      onChange={() => {}}
      onClick={() => this.handleCheckbox(id, !value)}
    />
  )

  handleCheckbox = (type, value) => {
    const { when } = this.props.form.getModel()

    this.props.form.change('when', {
      ...when,
      multipleDays: type === 'multipleDays' ? value : false,
      repeat: type === 'repeat' ? value : false
    })
  }
}

SecondStep.propTypes = {
  form: PropTypes.object
}

export default SecondStep
