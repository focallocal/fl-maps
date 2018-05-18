import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CustomInput, FormText } from 'reactstrap'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
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

        {weekDays.map((day, index) => {
          return (
            <div key={index} className='day'>
              <CustomInput
                id={day}
                className='checkbox'
                type='checkbox'
                label={day.substr(0, 3)}
                checked={selectedDays.includes(day)}
                onChange={() => this.handleDayChange(day, index)}
              />
              <div className='hours'>
                <AutoField name={'when.specificPeriod.days.' + index + '.startingTime'} />
                <span>-</span>
                <AutoField name={'when.specificPeriod.days.' + index + '.endingTime'} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  handleDayChange = (day, index) => {
    const { form } = this.props
    let selectedDays = [...this.state.selectedDays]

    if (selectedDays.includes(day)) {
      // Uncheck day
      selectedDays[index] = null

      // Delete the day object from form's model
      let days = [...form.getModel().when.specificPeriod.days]
      days.splice(index, 1, null)

      // Update model
      form.change('when.specificPeriod.days', days)
    } else {
      // Check day
      selectedDays[index] = day
    }

    this.setState({ selectedDays })
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
