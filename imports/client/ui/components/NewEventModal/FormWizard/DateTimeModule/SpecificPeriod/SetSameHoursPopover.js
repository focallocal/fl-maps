import React, { Component } from 'react'
import { Popover, PopoverBody } from 'reactstrap'
import Select from 'react-select'
import possibleEventHours from '/imports/both/collections/events/helpers/possibleEventHours'
import { formatReactSelectOptions } from '/imports/client/utils/format'

const options = formatReactSelectOptions(possibleEventHours)

class SetSameHoursPopover extends Component {
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
    this.props.handleDefaults('startingTime', value.label)
  }

  handleEndingTime = value => {
    this.setState({ endingTime: value })
    this.props.handleDefaults('endingTime', value.label)
  }

  togglePopover = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }
}

export default SetSameHoursPopover
