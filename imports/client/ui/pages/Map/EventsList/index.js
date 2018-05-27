import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'reactstrap'
import EventsListItem from './EventsListItem'
import MinimizeButton from './MinimizeButton'
import './styles.scss'

class EventsList extends Component {
  state = {
    events: [],
    loading: true,
    noData: false,
    minimized: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    // If we had an array of events but they were eith filtered/researched

    if (prevState.events[0] && !nextProps.events[0]) {
      return {
        events: [],
        noData: true,
        loading: nextProps.isFetching
      }
    }

    return {
      events: nextProps.events,
      loading: nextProps.isFetching
    }
  }

  componentDidMount () {
    const timeout = 5000 // try this for 5 seconds
    const startingTime = Date.now()
    this.interval = setInterval(() => {
      // if more than 5 seconds have passed
      if (this.interval && Date.now() - startingTime > timeout) {
        this.setState({
          noData: true
        })
        clearInterval(this.interval)
      }
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.interval = null
  }

  render () {
    const {
      events,
      loading,
      noData,
      minimized
    } = this.state

    const {
      userLocation
    } = this.props

    return (
      <Fragment>
        <div id='events-list' className={minimized ? 'minimized' : ''}>
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
                  onItemClick={this.props.toggleInfoWindow}
                />
              )
            })}
          </ListGroup>
          {(loading || !noData) && <this.Loading />}
          {noData && <this.NoData />}
        </div>
        <MinimizeButton onMinimize={this.toggleMinimize} minimized={minimized} />
      </Fragment>
    )
  }

  Loading () {
    return (
      <div className='va-center loader'>
        <div className='ball-beat'>
          <div /><div /><div />
        </div>
        <div>looking for events near you...</div>
      </div>
    )
  }

  NoData () {
    return (
      <div className='no-near-events va-center'>
        <div>Sorry, we couldn't find anything</div>
        <div>around you...</div>
      </div>
    )
  }

  toggleMinimize = () => {
    this.setState({ minimized: !this.state.minimized })
  }
}

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
  userLocation: PropTypes.object,
  isFetching: PropTypes.bool,
  toggleInfoWindow: PropTypes.func.isRequired
}

export default EventsList
