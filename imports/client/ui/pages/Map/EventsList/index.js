import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap'
import EventsListItem from './EventsListItem'
import MinimizeButton from './MinimizeButton'
import EventInfo from './EventInfo'
import './styles.scss'

class EventsList extends Component {
  state = {
    events: []
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    // If we had an array of events but they were eith filtered/researched
    let state = {
      events: nextProps.events,
      currentEvent: nextProps.currentEvent
    }

    if (prevState.currentEvent && !nextProps.currentEvent) {
      state.currentEvent = null
    }

    return state
  }

  render () {
    const {
      currentEvent,
      events
    } = this.state

    const {
      isFetching,
      userLocation
    } = this.props

    const hasData = !!events[0]

    return (
      <Fragment>
        <div id='events-list'>
          <div className='header'>
            {this.props.children} {/* Search Box */}
          </div>
          <ListGroup>
            {events && events.map((event, index) => {
              return (
                <EventsListItem
                  key={index}
                  item={event}
                  userLocation={userLocation}
                  onItemClick={this.props.onItemClick}
                />
              )
            })}
          </ListGroup>
          <Loading show={isFetching} />
          <NoResults show={!hasData && !isFetching} />
        </div>

        <MinimizeButton onMinimize={this.toggleMinimize} />

        <EventInfo
          event={events.find(event => event._id === currentEvent)}
          onDirections={this.props.onDirections}
          userLocation={userLocation}
          returnToList={this.returnToList}
        />
      </Fragment>
    )
  }

  toggleMinimize = () => {
    document.body.querySelector('#map-container').classList.toggle('minimized')
  }

  returnToList = () => {
    this.props.removeCurrentEvent()
  }
}

const Loading = ({ show }) => (
  show && (
    <div className='va-center loader'>
      <div className='ball-beat'>
        <div /><div /><div />
      </div>
      <div>looking for events near you...</div>
    </div>
  )
)

const NoResults = ({ show }) => (
  show && (
    <div className='no-near-events va-center'>
      <div>Sorry, we could not find anything</div>
      <div>around you...</div>
    </div>
  )
)

EventsList.propTypes = {
  currentEvent: PropTypes.string,
  events: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  onDirections: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  userLocation: PropTypes.object,
  removeCurrentEvent: PropTypes.func.isRequired
}

export default EventsList

// For testing
export {
  Loading,
  NoResults
}
