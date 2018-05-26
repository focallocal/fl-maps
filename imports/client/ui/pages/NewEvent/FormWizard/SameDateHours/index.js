import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover, PopoverBody } from 'reactstrap'
import Select from 'react-select'
import possibleEventHours from '/imports/both/collections/events/helpers/possibleEventHours'
import { formatReactSelectOptions } from '/imports/client/utils/format'

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
            />

            <Select
              value={endingTime}
              options={options}
              onChange={this.handleEndingTime}
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
    // Update days with the same hours!

    const {
      form
    } = this.props

    const model = form.getModel()
    const selectedDays = model.when.days

    let days = JSON.parse(JSON.stringify(selectedDays || []))
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
    form.change('when.days', days)
  }

  togglePopover = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
}

SameDateHours.defaultProps = {
  form: PropTypes.object.isRequired
}

export default SameDateHours
