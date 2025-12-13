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

  handleStartingTime = value => {
    this.setState({ startingTime: value })
    this.handleDefaults('startingTime', value.label)
  }

  handleEndingTime = value => {
    this.setState({ endingTime: value })
    this.handleDefaults('endingTime', value.label)
  }

  handleDefaults = (key, value) => {
    // Update all selected days with the same hours!

    const {
      form
    } = this.props

    const model = form.getModel()
    const selectedDays = model.when.days || []

    // Update each day entry with the new time value
    const updatedDays = selectedDays.map(day => {
      if (!day || !day.day) { return day } // Skip invalid entries
      return {
        ...day,
        [key]: value
      }
    }).filter(day => day && day.day) // Remove any invalid entries

    form.change('when.days', updatedDays)
  }

  togglePopover = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
}

SameDateHours.defaultProps = {
  form: PropTypes.object.isRequired
}

export default SameDateHours
