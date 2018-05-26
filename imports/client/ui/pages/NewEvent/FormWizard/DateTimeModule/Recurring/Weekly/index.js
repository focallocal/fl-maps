import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
class RecurrWeekly extends Component {
  render () {
    const {
      selectedDays
    } = this.props

    return (
      <div id='recurr-weekly'>
        Repeat on
        <div className='weekdays'>
          {weekDays.map((day, index) => {
            const active = selectedDays.includes(day)

            return (
              <div key={index} data-day={day} onClick={this.toggleDay} className={active ? 'active' : ''}>
                {day[0]}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  toggleDay = ({ target }) => {
    const {
      form,
      selectedDays,
      schemaKey
    } = this.props

    const day = target.getAttribute('data-day')

    let updatedDays
    if (selectedDays.find(d => d === day)) {
      updatedDays = selectedDays.filter(d => d !== day)
    } else {
      updatedDays = [...selectedDays, day]
    }
    form.change(schemaKey, updatedDays)
  }
}

RecurrWeekly.propTypes = {
  form: PropTypes.object.isRequired,
  schemaKey: PropTypes.string.isRequired,
  selectedDays: PropTypes.array.isRequired
}

export default RecurrWeekly
