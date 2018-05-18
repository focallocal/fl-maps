import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import { CustomInput } from 'reactstrap'
import MonthlyPickDays from './MonthlyPickDays'
import './styles.scss'

class Recurring extends Component {
  render () {
    const {
      show
    } = this.props

    const CheckBox = this.CheckBox
    const { forever } = this.props.form.getModel().when.recurring

    return (
      <div id='recurring' style={{ display: show ? 'block' : 'none' }}>

        <div>
          <span className='inline-fields'>
            Repeat every
            <AutoField name='when.recurring.every' />
            <AutoField name='when.recurring.type' />
          </span>
        </div>
        <div>Select the recurring days:</div>
        <MonthlyPickDays
          handleMonthlyDays={this.handleMonthlyDays}
        />

        <div>For how long?</div>
        <CheckBox
          id='forever'
          label='Forever'
          checked={forever}
        />
        {!forever && (
          <div>
            <span className='inline-fields'>
              Repeat
              <AutoField name='when.recurring.repeat' />
              <span>times, until</span>
              <AutoField name='when.recurring.until' />
            </span>
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
