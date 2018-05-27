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

    let days_ = []
    let multipleDays_ = false
    let repeat_ = false

    try {
      const { when } = form.getModel()
      const {
        days,
        multipleDays,
        repeat
      } = when

      days_ = days || []
      multipleDays_ = multipleDays || false
      repeat_ = repeat || false
    } catch (ex) { /* fail silently */ }

    return (
      <div id='second-step'>

        {/* Dates and Hours */}
        <div className='dates-hours inline-inputs hide-labels'>
          <div>
            <AutoField name='when.startingDate' />
            {!multipleDays_ && <AutoField name='when.startingTime' />}
          </div>

          <span className='between'>to</span>

          <div>
            {!repeat_ && <AutoField name='when.endingDate' />}
            {!multipleDays_ && <AutoField name='when.endingTime' />}
          </div>
        </div>

        {/* Weekdays  */}
        <CheckBox
          id='multipleDays'
          label='More then one day'
          value={multipleDays_}
          type='radio'
        />
        {multipleDays_ && (
          <div className='week-days'>
            <ErrorField name='when.days' errorMessage='Please select at least 1 day' />
            <SameDateHours
              form={form}
              schemaKey={'when.days'}
            />
            <WeekDays
              form={form}
              schemaKey={'when.days'}
              selectedDays={days_}
            />
          </div>
        )}

        {/* Repetition */}
        <CheckBox
          id='repeat'
          label='Custom recurrence'
          value={repeat_}
          type='radio'
        />
        {repeat_ && <Recurring form={form} />}

      </div>
    )
  }

  CheckBox = ({ label, id, value, type }) => (
    <CustomInput
      id={id}
      type={type}
      label={label}
      checked={value}
      onChange={() => {}}
      onClick={type === 'radio' ? () => this.handleCheckbox(id, !value) : null}
    />
  )

  handleCheckbox = (type, value) => {
    const {
      form
    } = this.props

    const { when } = form.getModel()

    // Handle multipleDays
    if (type === 'multipleDays') {
      if (value) { // reset values
        form.change('when', {
          ...when,
          multipleDays: true,
          repeat: false
        })
      } else { // restore previous values so users doesn't need to re-enter them
        form.change('when.multipleDays', false)
      }
      return
    }

    // Handle repeat

    if (value !== undefined) {
      this.props.form.change('when', {
        ...when,
        multipleDays: false,
        repeat: value
      })
    }
  }
}

SecondStep.propTypes = {
  form: PropTypes.object
}

export default SecondStep
