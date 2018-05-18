import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormText } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import WeekDays from '../WeekDays'
import SetSameHoursPopover from './SetSameHoursPopover'
import './styles.scss'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class SpecificPeriod extends Component {
  state = {
    currentCheckbox: 0,
    selectedDays: weekDays, // all are checked by default
    setSameHours: false
  }

  render () {
    const {
      selectedDays
    } = this.state

    const {
      form
    } = this.props

    return (
      <div id='specific-period' style={{ display: this.props.show ? 'block' : 'none' }}>
        <div className='inline-inputs'>
          <AutoField name='when.specificPeriod.startingDate' />
          <AutoField name='when.specificPeriod.endingDate' />
        </div>
        <FormText>
          Running regularly? keep the dates empty
          <span className='small-letters-color-transition' onClick={this.resetDates}>(reset)</span>
        </FormText>

        <SetSameHoursPopover handleDefaults={this.handleDefaults} />

        <WeekDays
          schemaKey='when.specificPeriod.days'
          selectedDays={selectedDays}
          form={form}
          context={this}
        />
      </div>
    )
  }

  handleDefaults = (key, value) => {
    // Update days with the same hours!

    const { form } = this.props
    const { selectedDays } = this.state

    let days = JSON.parse(JSON.stringify(form.getModel().when.specificPeriod.days))
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
}

SpecificPeriod.propTypes = {
  form: PropTypes.object.isRequired
}

export default SpecificPeriod
