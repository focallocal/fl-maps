import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormText } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import ErrorField from '/imports/client/utils/uniforms-custom/ErrorField'
import WeekDays from '../WeekDays'
import SetSameHoursPopover from './SetSameHoursPopover'
import './styles.scss'

class SpecificPeriod extends Component {
  state = {
    currentCheckbox: 0,
    setSameHours: false
  }

  render () {
    const {
      form,
      show
    } = this.props

    let selectedDays = []
    try {
      selectedDays = form.getModel().when.specificPeriod.days || []
    } catch (ex) {}

    return (
      <div id='specific-period' style={{ display: show ? 'block' : 'none' }}>
        <div className='inline-inputs'>
          <AutoField name='when.specificPeriod.startingDate' />
          <AutoField name='when.specificPeriod.endingDate' />
        </div>
        <FormText>
          Running regularly? keep the dates empty
          <span className='small-letters-color-transition' onClick={this.resetDates}>(reset)</span>
        </FormText>

        <ErrorField
          name='when.specificPeriod.days'
          customMessage='Please select at least one day'
        />
        <SetSameHoursPopover handleDefaults={this.handleDefaults} />

        <WeekDays
          schemaKey='when.specificPeriod.days'
          selectedDays={selectedDays}
          form={form}
        />
      </div>
    )
  }

  handleDefaults = (key, value) => {
    // Update days with the same hours!

    const { form } = this.props
    const selectedDays = form.getModel().when.specificPeriod.days || []

    let days = JSON.parse(JSON.stringify(form.getModel().when.specificPeriod.days || []))
    selectedDays.forEach((day, i) => {
      if (!day) { return } // null

      if (days[i]) {
        days[i][key] = value
      } else {
        days[i] = {
          [key]: value
        }
      }
    })

    form.change('when.specificPeriod.days', days)
  }

  resetDates = () => {
    const { form } = this.props

    form.change('when.specificPeriod.startingDate', null)
    form.change('when.specificPeriod.endingDate', null)
  }

  updateSelectedDays = (days) => {
    this.setState({ days: days })
  }
}

SpecificPeriod.propTypes = {
  form: PropTypes.object.isRequired
}

export default SpecificPeriod
