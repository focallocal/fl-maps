import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import ErrorField from '/imports/client/utils/uniforms-custom/ErrorField'
import { CustomInput } from 'reactstrap'
import MonthlyPickDays from './MonthlyPickDays'
import './styles.scss'

class Recurring extends Component {
  render () {
    const {
      show
    } = this.props

    const CheckBox = this.CheckBox

    let forever = false
    let selectedDays = []
    try {
      const model = this.props.form.getModel()

      selectedDays = model.when.recurring.days || []
      forever = model.when.recurring.forever

      if (forever === undefined) { // fix uncontrolled input error
        forever = false
      }
    } catch (ex) {}

    return (
      <div id='recurring' style={{ display: show ? 'block' : 'none' }}>

        <div className='inline-fields'>
            Repeat every
          <AutoField name='when.recurring.every' />
          <AutoField name='when.recurring.type' />
        </div>
        <ErrorField
          name='when.recurring.days'
          customMessage='Please select at least 1 day'
        />
        <div>Select the recurring days:</div>
        <MonthlyPickDays
          selectedDays={selectedDays}
          handleMonthlyDays={this.handleMonthlyDays}
        />

        <div>For how long?</div>
        <CheckBox
          id='forever'
          label='Forever'
          checked={forever}
        />
        {!forever && (
          <div className='inline-fields'>
            Repeat
            <AutoField name='when.recurring.repeat' />
            <span>times, until</span>
            <AutoField name='when.recurring.until' />
          </div>
        )}
      </div>
    )
  }

  CheckBox = ({ label, id, checked }) => (
    <CustomInput
      id={id}
      className='checkbox'
      type='checkbox'
      label={label}
      checked={checked}
      onChange={() => this.handleCheckbox(!checked)}
    />
  )

  handleCheckbox = (checked) => {
    this.props.form.change(`when.recurring.forever`, checked)
  }

  handleMonthlyDays = (days) => {
    this.props.form.change('when.recurring.days', days)
  }
}

Recurring.propTypes = {
  form: PropTypes.object.isRequired
}

export default Recurring
