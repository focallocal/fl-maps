import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CustomInput } from 'reactstrap'
import JustOneDay from './DateTimeModule/JustOneDay'
import SpecificPeriod from './DateTimeModule/SpecificPeriod'
import Recurring from './DateTimeModule/Recurring'

class SecondStep extends Component {
  state = {
    dateType: 'oneDay' // oneDay, specificPeriod, recurring
  }

  render () {
    const {
      dateType
    } = this.state

    const {
      form
    } = this.props

    const CheckBox = this.CheckBox

    return (
      <div style={{ display: this.props.show ? 'block' : 'none' }}>

        <CheckBox label='Is it just one day?' id={'oneDay'} />
        <JustOneDay show={dateType === 'oneDay'} />

        <CheckBox label='Is it for a specific period?' id={'specificPeriod'} />
        <SpecificPeriod show={dateType === 'specificPeriod'} form={form} />

        <CheckBox label='Is it repeating?' id={'recurring'} />
        <Recurring show={dateType === 'recurring'} form={form} />
      </div>
    )
  }

  CheckBox = ({ label, id }) => (
    <CustomInput
      id={id}
      className='checkbox'
      type='radio'
      label={label}
      checked={this.state.dateType === id}
      onChange={() => this.handleCheckbox(id)}
    />
  )

  handleCheckbox = (id) => {
    const { form } = this.props

    form.change('when.type', id)
    this.setState({ dateType: id })
  }
}

SecondStep.propTypes = {
  form: PropTypes.object
}

export default SecondStep
