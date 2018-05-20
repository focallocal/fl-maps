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

    return (
      <div style={{ display: this.props.show ? 'block' : 'none' }}>

        <CheckBox
          label='Is it just one day?'
          id={'oneDay'}
          checked={dateType === 'oneDay'}
        />
        <JustOneDay show={dateType === 'oneDay'} />

        <CheckBox
          label='Is it for a specific period?'
          id={'specificPeriod'}
          checked={dateType === 'specificPeriod'}
        />
        <SpecificPeriod show={dateType === 'specificPeriod'} form={form} />

        <CheckBox
          label='Is it recurring?'
          id={'recurring'}
          checked={dateType === 'recurring'}
        />
        <Recurring show={dateType === 'recurring'} form={form} />
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

  handleCheckbox = (id) => {
    this.props.form.change('when.type', id)
  }
}

SecondStep.propTypes = {
  form: PropTypes.object
}

export default SecondStep
