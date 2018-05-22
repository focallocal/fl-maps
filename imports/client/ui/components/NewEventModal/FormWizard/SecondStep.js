import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CustomInput } from 'reactstrap'
import JustOneDay from './DateTimeModule/JustOneDay'
import SpecificPeriod from './DateTimeModule/SpecificPeriod'
import Recurring from './DateTimeModule/Recurring'

class SecondStep extends Component {
  render () {
    const {
      form
    } = this.props

    const CheckBox = this.CheckBox

    let dateType = 'oneDay'
    try {
      dateType = form.getModel().when.type
    } catch (ex) {}

    const isOneDay = dateType === 'oneDay'
    const isSpecific = ['specificPeriod', 'regularHours'].includes(dateType)
    const isRecurring = dateType === 'recurring'

    return (
      <div id='second-step' style={{ display: this.props.show ? 'block' : 'none' }}>

        <CheckBox
          label='Is it just one day?'
          id={'oneDay'}
          checked={isOneDay}
        />
        <JustOneDay show={isOneDay} />

        <CheckBox
          label='Is it for a specific period?'
          id={'specificPeriod'}
          checked={isSpecific}
        />
        <SpecificPeriod show={isSpecific} form={form} />

        <CheckBox
          label='Is it recurring?'
          id={'recurring'}
          checked={isRecurring}
        />
        <Recurring show={isRecurring} form={form} />
      </div>
    )
  }

  CheckBox = ({ label, id, checked }) => (
    <CustomInput
      id={id}
      className='checkbox'
      type='radio'
      label={label}
      checked={checked}
      onChange={() => this.handleCheckbox(id)}
    />
  )

  handleCheckbox = (type) => {
    const { type: previousType } = this.props.form.getModel().when || {}

    if (previousType) {
      this.props.form.change(`when.${previousType}`, null) // remove previous data after change
    }

    this.props.form.change('when', { type, [type]: {} })
  }
}

SecondStep.propTypes = {
  form: PropTypes.object
}

export default SecondStep
