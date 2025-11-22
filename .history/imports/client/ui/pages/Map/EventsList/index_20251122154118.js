import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap'

import EventsListItem from './EventsListItem'
import MinimizeButton from './MinimizeButton'
import EventInfo from './EventInfo'

import { inIFrame } from 'dcs-client'
import * as Gravatar from '/imports/client/utils/Gravatar'
import { getDiscourseAvatarUrl } from '/imports/client/utils/discourseAvatar'

import './styles.scss'

class EventsList extends Component {
  state = {
    events: [],
    avatarMap: {}
  }

  pendingAvatarLookups = new Map()
  _isMounted = false

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

  componentDidMount () {
    this._isMounted = true
    this.populateAvatarMap(this.props.events)
    
    // Ensure mouse wheel scrolling works on events list
    const eventsList = document.getElementById('events-list')
    if (eventsList) {
      eventsList.addEventListener('wheel', this.handleWheel, { passive: false })
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.events !== this.props.events) {
      this.populateAvatarMap(this.props.events)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this.pendingAvatarLookups.clear()
    
    // Clean up wheel event listener
    const eventsList = document.getElementById('events-list')
    if (eventsList) {
      eventsList.removeEventListener('wheel', this.handleWheel)
    }
  }

  handleWheel = (e) => {
    // Stop wheel events from propagating to the Google Map
    e.stopPropagation()
  }

  populateAvatarMap = (events = []) => {
    if (!Array.isArray(events)) {
      return
    }

    events.forEach(event => {
      if (!event || !event._id) {
        return
      }

      const existing = this.state.avatarMap[event._id]
      if (existing !== undefined || this.pendingAvatarLookups.has(event._id)) {
        return
      }

      const username = event.organiser && event.organiser.username
      if (!username) {
        const fallback = this.getFallbackAvatar(event)
        this.setAvatarForEvent(event._id, fallback)
        return
      }

      this.pendingAvatarLookups.set(event._id, true)
      getDiscourseAvatarUrl(username, 50)
        .then(url => {
          const resolved = url || this.getFallbackAvatar(event)
          this.setAvatarForEvent(event._id, resolved)
        })
        .catch(() => {
          this.setAvatarForEvent(event._id, this.getFallbackAvatar(event))
        })
        .finally(() => {
          this.pendingAvatarLookups.delete(event._id)
        })
    })
  }

  setAvatarForEvent = (eventId, url) => {
    if (!this._isMounted) {
      return
    }
    this.setState(prevState => ({
      avatarMap: {
        ...prevState.avatarMap,
        [eventId]: url
      }
    }))
  }

  getFallbackAvatar = (event) => {
    const organiser = event && event.organiser
    const identifier = organiser?.username || organiser?.name || 'user'
    try {
      return Gravatar.getGravatar(identifier, 50)
    } catch (error) {
      console.warn('[EventsList] Failed to build fallback avatar', error)
      return ''
    }
  }

  render () {
    const {
      currentEvent,
      events
    } = this.state

    const {
      isFetching,
      userLocation,
      history,
    } = this.props

    const currentEventProp = this.props.currentEvent
    const standaloneMode = !inIFrame()
    const hasData = !!events[0]
    return (
      <Fragment>
        <div id='events-list' className={standaloneMode ? 'offset-standalone-menu' : undefined}>
          <div className='header'>
            {this.props.children} {/* Search Box */}
          </div>
          <ListGroup>
            {events && events.map((event, index) => {
              const ishovered = this.props.hoveredEvent === event._id ;
              return (
                <EventsListItem
                  key={event._id || index}
                  item={event}
                  userLocation={userLocation}
                  avatarUrl={this.state.avatarMap[event._id]}
                  onItemClick={this.props.onItemClick}
                  ishovered={ishovered} 
                />
              )
            })}
          </ListGroup>
          <Loading show={isFetching} />
          <NoResults show={!hasData && !isFetching} />
        </div>

        <MinimizeButton />

        <EventInfo
          event={events.find(event => event._id === currentEvent)}
          openMoreInfo={this.props.openMoreInfo}
          onDirections={this.props.onDirections}
          userLocation={userLocation}
          returnToList={this.returnToList}
          history={history}
        />
      </Fragment>
    )
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
  openMoreInfo: PropTypes.func.isRequired,
  userLocation: PropTypes.object,
  removeCurrentEvent: PropTypes.func.isRequired
}

export default EventsList

// For testing
export {
  Loading,
  NoResults
}
