import React, { Component } from 'react'
import EventsDisplay from './../EventsDisplay/index'

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = { }
  }

  render () {
    const { userEvents, user, isAllEvents, deleteAllEvents } = this.props
    const safeUserEvents = userEvents || []
    const events = safeUserEvents.filter(ele => {
      return ele.organiser._id === user._id
    })

    return (
      <React.Fragment>
        < EventsDisplay userEvents={events} isAllEvents={isAllEvents} deleteAllEvents={deleteAllEvents} />
      </React.Fragment>
    )
  }
}

export default Events
