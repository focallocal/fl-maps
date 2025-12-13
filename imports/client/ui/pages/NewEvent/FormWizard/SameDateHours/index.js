import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverBody } from 'reactstrap'
import Select from 'react-select'
import possibleEventHours from '/imports/both/collections/events/helpers/possibleEventHours'
import { formatReactSelectOptions } from '/imports/client/utils/format'
import './styles.scss'

const options = formatReactSelectOptions(possibleEventHours)

class SameDateHours extends Component {
  state = {
    isOpen: false,
    startingTime: null,
    endingTime: null
  }

  render () {
    const {
      isOpen,
      startingTime,
      endingTime
    } = this.state

    return (
      <div className='set-same-hours'>
        <span id='set-hours' className='small-letters-color-transition' onClick={this.togglePopover}>
          Click here to set the same hours for all selected days
        </span>
        <Popover placement='top' target='set-hours' isOpen={isOpen} toggle={this.togglePopover}>
          <PopoverBody id='select-new-hours'>
            <div>Select new hours</div>
            <Select
              value={startingTime}
              options={options}
              onChange={this.handleStartingTime}
              isSearchable={false}
            />

            <Select
              value={endingTime}
              options={options}
              onChange={this.handleEndingTime}
              isSearchable={false}
            />
          </PopoverBody>
        </Popover>
      </div>
    )
  }

  // Normalize time to HH:mm format (e.g., "9:00" -> "09:00")
  normalizeTime = (time) => {
    if (!time || typeof time !== 'string') return ''
    const parts = time.split(':')
    if (parts.length !== 2) return time
    const hours = parts[0].padStart(2, '0')
    const mins = parts[1].padStart(2, '0')
    return `${hours}:${mins}`
  }

  handleStartingTime = value => {
    this.setState({ startingTime: value })
    // Use value.label (the actual time string) - value.value is the index
    this.handleDefaults('startingTime', this.normalizeTime(value?.label || ''))
  }

  handleEndingTime = value => {
    this.setState({ endingTime: value })
    // Use value.label (the actual time string) - value.value is the index
    this.handleDefaults('endingTime', this.normalizeTime(value?.label || ''))
  }

  handleDefaults = (key, value) => {
    // Update all selected days with the same hours!

    const {
      form
    } = this.props

    const model = form.getModel()
    const currentWhen = model.when || {}
    const selectedDays = currentWhen.days || []

    // Update each day entry with the new time value
    const updatedDays = selectedDays.map(day => {
      if (!day || !day.day) { return day } // Skip invalid entries
      return {
        ...day,
        [key]: value
      }
    }).filter(day => day && day.day) // Remove any invalid entries

    // Update the entire 'when' object since form.change doesn't handle nested paths
    const updatedWhen = { ...currentWhen, days: updatedDays }
    form.change('when', updatedWhen)
  }

  togglePopover = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
}

SameDateHours.defaultProps = {
  form: PropTypes.object.isRequired
}

export default SameDateHours
