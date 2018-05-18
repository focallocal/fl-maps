import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import { CustomInput } from 'reactstrap'
import WeekDays from '../WeekDays'
import MonthlyPickDays from './MonthlyPickDays'
import './styles.scss'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class Recurring extends Component {
  state = {
    recurType: 'monthly',
    selectedDays: weekDays // all are checked by default
  }

  render () {
    const {
      recurType,
      selectedDays
    } = this.state

    const {
      show,
      form
    } = this.props

    const CheckBox = this.CheckBox

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
      </div>
    )
  }

  CheckBox = ({ label, id }) => (
    <CustomInput
      id={id}
      className='checkbox'
      type='checkbox'
      label={label}
      checked={this.state.recurType === id}
      onChange={() => this.handleCheckbox(id)}
    />
  )

  handleCheckbox = (id) => {
    this.props.form.change('when.recurring.type', id)
    this.setState({ recurType: id })
  }

  handleMonthlyDays = (days) => {
    this.props.form.change('when.recurring.days', days)
  }
}

Recurring.propTypes = {
  form: PropTypes.object.isRequired
}

export default Recurring
