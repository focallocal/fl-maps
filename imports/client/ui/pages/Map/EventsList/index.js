import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, Button } from 'reactstrap'

import EventsListItem from './EventsListItem'
import MinimizeButton from './MinimizeButton'
import EventInfo from './EventInfo'

import { inIFrame } from 'dcs-client'
import { getFallbackAvatarAsync } from '/imports/client/utils/avatarFallback'
import { getDiscourseAvatarUrl, clearAvatarCache } from '/imports/client/utils/discourseAvatar'
import i18n from '/imports/both/i18n/en'

import './styles.scss'

const i18n_ = i18n.Map

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
    // Clear avatar cache to ensure fresh avatars are fetched
    clearAvatarCache()
    this.populateAvatarMap(this.props.events)
    this.attachWheelListener()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.events !== this.props.events) {
      this.populateAvatarMap(this.props.events)
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this.pendingAvatarLookups.clear()
    this.detachWheelListener()
  }

  // Stop wheel events from propagating to Google Maps (which uses greedy gesture handling)
  attachWheelListener = () => {
    const listElement = document.getElementById('events-list')
    if (listElement && !this.wheelListenerAttached) {
      listElement.addEventListener('wheel', this.handleWheel, { passive: false })
      this.wheelListenerAttached = true
    }
  }

  detachWheelListener = () => {
    const listElement = document.getElementById('events-list')
    if (listElement && this.wheelListenerAttached) {
      listElement.removeEventListener('wheel', this.handleWheel)
      this.wheelListenerAttached = false
    }
  }

  handleWheel = (e) => {
    // Stop the event from reaching Google Maps
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
        this.getFallbackAvatar(event).then(fallback => {
          this.setAvatarForEvent(event._id, fallback)
        })
        return
      }

      this.pendingAvatarLookups.set(event._id, true)
      getDiscourseAvatarUrl(username, 90)
        .then(url => {
          if (url) {
            this.setAvatarForEvent(event._id, url)
          } else {
            return this.getFallbackAvatar(event).then(fallback => {
              this.setAvatarForEvent(event._id, fallback)
            })
          }
        })
        .catch(() => {
          this.getFallbackAvatar(event).then(fallback => {
            this.setAvatarForEvent(event._id, fallback)
          })
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
    // Use username, then name (if not placeholder '-'), then event ID as identifier
    let identifier = organiser?.username
    if (!identifier && organiser?.name && organiser.name !== '-') {
      identifier = organiser.name
    }
    if (!identifier) {
      // Use event ID for old events without organiser info
      identifier = event?._id || 'anonymous'
    }
    return getFallbackAvatarAsync(identifier, 80)
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
                  showNextView={this.props.showNextView}
                />
              )
            })}
          </ListGroup>
          {this.props.totalEvents > events.length && (
            <Button 
              color="link" 
              className="load-more-btn" 
              onClick={this.props.onLoadMore}
              style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            >
              Load More ({events.length} of {this.props.totalEvents})
            </Button>
          )}
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
      <div>{i18n_.loading}</div>
    </div>
  )
)

const NoResults = ({ show }) => (
  show && (
    <div className='no-near-events va-center'>
      <div>{i18n_.noResults}</div>
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
  removeCurrentEvent: PropTypes.func.isRequired,
  showNextView: PropTypes.bool
}

export default EventsList

// For testing
export {
  Loading,
  NoResults
}
