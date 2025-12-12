// External Libraries
import { Meteor } from 'meteor/meteor'
import React, { Component, Fragment } from 'react'
import debounce from 'lodash.debounce'
import { DirectionsRenderer, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import { Link } from 'react-router-dom'
import { Alert, Button, Input } from 'reactstrap'

// Components and Pages
import FiltersList from './EventsFilter'
import EventsList from './EventsList'
import MarkerWrapper from './MarkerWrapper'
import SearchButtons from './SearchButtons'

// Utils
import { inIFrame } from 'dcs-client'
import mapOptions from './mapOptions'
import { ensureUniquePosition } from './utils'
import { toggleBodyOverflow } from '/imports/client/utils/DOMInteractions'
import getUserPosition from '/imports/client/utils/location/getUserPosition'
import { findNextEvent } from '/imports/client/utils/findNextEvent'

// Styles and Other
import './mobile-styles.scss'
import './styles.scss'
import i18n from '/imports/both/i18n/en'

class MapComponent_ extends Component {
  constructor() {
    super()
    this.state = {
      bounds: null,
      center: { lat: 46, lng: -43 },
      currentEvent: null,
      directions: null,
      error: null,
      events: [],
      filteredEvents: null,
      isFetching: true,
      showFilters: false,
      userLocation: null, // Set via getUserPosition or search box
      zoom: 3,
      mapRadius: null,
      showPastEvents: false,
      showNextView: false,
      hoveredEvent: null,
      isHovered: false,
      listDisplayCount: 30, // Number of events to show in list (pagination)
      hasLoadedInitial: false // Flag to trigger initial events load via onIdle
    }
    
    // Debounce getEvents to prevent rapid-fire API calls when scrolling/zooming
    // Rate limit is 8 requests per 2 seconds, so 700ms debounce = max ~3 calls per 2s (safe margin)
    this.debouncedGetEvents = debounce((location, skip, limit) => {
      this.getEvents(location, skip, limit)
    }, 700, { leading: false, trailing: true })
  }

  memoizeLocations = {} // cache locations

  componentDidMount() {
    if (window.FlMapsTiming) window.FlMapsTiming.log('Map component mounting')
    
    if (window.previousStateOfMap) {
      this.setState({ ...window.previousStateOfMap })
    }

    window.__setDocumentTitle('Map')
    toggleBodyOverflow()
    this._isMounted = true // don't remove that line

    // keep at bottom of componentDidMount so that the event list is displayed and
    // correct zoom level  when individual page is closed
    this.returnToDefaultAfterPageClose()

    // Fix for white screen / half-page map issue in iframes
    // Trigger Google Maps resize after a short delay to ensure proper rendering
    if (inIFrame()) {
      setTimeout(() => {
        if (this.map && typeof google !== 'undefined' && google.maps) {
          google.maps.event.trigger(this.map, 'resize')
          // Don't panTo - let user's current view persist
          if (window.FlMapsTiming) window.FlMapsTiming.log('Google Maps resize triggered')
        }
      }, 300)
    }
    
    if (window.FlMapsTiming) window.FlMapsTiming.log('Map component mounted')
  }

  componentWillUnmount() {
    toggleBodyOverflow()
    this._isMounted = false // don't remove that line
    
    // Cancel any pending debounced calls
    if (this.debouncedGetEvents) {
      this.debouncedGetEvents.cancel()
    }
  }

  componentDidUpdate(nextProps, prevState) {
    const {
      userLocation,
      userLocationError
    } = this.state

    // When user location is detected, load events (debounced to prevent rate limit)
    if (!prevState.userLocation && userLocation) {
      this.debouncedGetEvents(userLocation)
    }

    if (!prevState.userLocationError && userLocationError) {
      this.setState({ isFetching: false })
    }

    // When toggling past events, reload (debounced)
    if (prevState.showPastEvents !== this.state.showPastEvents) {
      this.debouncedGetEvents()
    }
  }

  render() {
    const {
      center,
      currentEvent,
      directions,
      error,
      events,
      filteredEvents,
      isFetching,
      showFilters,
      userLocation,
      zoom,
      hoveredEvent,
      isHovered

    } = this.state

    const { history } = this.props

    const { MainMenu, NextViewConfig } = i18n

    const events_ = filteredEvents || events
    
    // Apply Next view filtering and sorting if enabled
    let processedEvents = events_
    if (this.state.showNextView) {
      const excludedCategories = NextViewConfig?.excludedCategories || []
      
      // Filter out excluded categories
      processedEvents = events_.filter(event => {
        const eventCategories = event.categories || []
        return !eventCategories.some(cat => 
          excludedCategories.includes(cat.name || cat)
        )
      })
      
      // Sort by next occurrence date
      processedEvents = processedEvents.sort((a, b) => {
        const getNextDate = (event) => {
          const when = event.when || {}
          if (when.repeat && when.recurring) {
            const { type, every, days, monthly } = when.recurring
            try {
              return findNextEvent(when.startingDate, type, every, days, monthly)
            } catch (e) {
              return new Date(when.startingDate)
            }
          }
          return new Date(when.startingDate)
        }
        return getNextDate(a) - getNextDate(b)
      })
    }
    
    // For the list: show only first N events (paginated)
    const listEvents = processedEvents.slice(0, this.state.listDisplayCount)
    // For map markers: show ALL events
    const mapEvents = events_

    return (


      <GoogleMap
        ref={ref => this.map = ref}
        center={center}
        zoom={zoom}
        defaultZoom={zoom}
        defaultOptions={mapOptions()}
        onZoomChanged={this.onZoomChanged}
        onDragEnd={this.onDragEnd}
        onTilesLoaded={this.onZoomChanged}
        onIdle={this.onMapIdle}
      >
        <Button className="gather-button" tag={Link} to="?new=1">{MainMenu.addEvent}</Button>

        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
          maxZoom={20}
          onClick={this.onMarkerClustererClick}
        >
          {mapEvents.map((event, i) =>
            <MarkerWrapper
              key={event._id}
              event={event}
              isCurrent={currentEvent === event._id}
              onMarkerClick={this.onMarkerClick}
              onMarkerHover={this.onMarkerHover}
              onMarkerLeave={this.onMarkerLeave}
              position={ensureUniquePosition(this.memoizeLocations, event, mapEvents)}
            />
          )}
        </MarkerClusterer>

        <FiltersList
          show={showFilters}
          events={events}
          onFilter={this.setFilteredEvents}
          toggleFiltersList={this.toggleFiltersList}
        />
        <EventsList
          currentEvent={currentEvent}
          events={listEvents}
          totalEvents={events_.length}
          onLoadMore={this.loadMoreEvents}
          isFetching={isFetching}
          onItemClick={this.onMarkerClick}
          hoveredEvent={this.state.hoveredEvent}
          isHovered={this.state.isHovered}
          openMoreInfo={this.openMoreInfo}
          userLocation={userLocation}
          removeCurrentEvent={this.removeCurrentEvent}
          onDirections={this.setDirections}
          history={history}
        >
          <StandaloneSearchBox
            ref={ref => this.searchBox = ref}
            onPlacesChanged={this.handlePlaces}
          >
            <Fragment>
              <Input id='google-maps-searchbox' type="text" placeholder="Search" />
              <SearchButtons
                toggleFilters={this.toggleFiltersList}
                toggleNextView={this.toggleNextView}
                showNextView={this.state.showNextView}
                togglePastEvents={this.togglePastEvents}
                showPastEvents={this.state.showPastEvents}
              />
            </Fragment>
          </StandaloneSearchBox>
        </EventsList>

        {userLocation && <Marker position={userLocation} />}
        {directions && <DirectionsRenderer directions={directions} />}
        <Alert id='map-error' color='danger' isOpen={!!error}>{error ? error.msg : ''}</Alert>
      </GoogleMap>
    )
  }

  onMarkerHover = (_id) => {
    this.setState({
      hoveredEvent: _id,
      isHovered: true
    });
  }

  onMarkerLeave = () => {
    this.setState({
      hoveredEvent: null
    });
  }

  onMarkerClick = (_id) => {
    if (!Meteor.userId()) {
      alert('You need to login before viewing event details')
      return null
    }

    // Get cached location data, or fall back to finding event in state
    let latLng, overlapping = false
    
    if (this.memoizeLocations[_id]) {
      const cached = this.memoizeLocations[_id]
      latLng = cached.latLng
      overlapping = cached.overlapping || false
      const cachedSet = this.memoizeLocations[`${latLng.lng}${latLng.lat}`]
      if (cachedSet && cachedSet.size > 1) {
        overlapping = true
      }
    } else {
      // Event not in cache - find from events array
      const event = this.state.events.find(e => e._id === _id)
      if (event && event.address && event.address.location) {
        const coords = event.address.location.coordinates
        latLng = { lng: coords[0], lat: coords[1] }
      } else {
        // Can't find event location, just set currentEvent without panning
        this.setState({ currentEvent: _id })
        return
      }
    }

    // Center map on clicked marker without delay
    if (this.map && latLng) {
      this.map.panTo(latLng)
    }

    this.setState({
      zoom: overlapping ? 22 : 18,
      currentEvent: _id
    })
  }

  toggleFiltersList = () => {
    this.setState({ showFilters: !this.state.showFilters })
  }

  setFilteredEvents = events => {
    this.setState({ filteredEvents: events })
  }

  onMarkerClustererClick = () => {
    this.setState({ zoom: this.map.getZoom() })
  }

  removeCurrentEvent = () => this.setState({ currentEvent: null })

  togglePastEvents = () => {
    this.setState((state) => ({ showPastEvents: !state.showPastEvents }))
  }

  toggleNextView = () => {
    this.setState((state) => ({ showNextView: !state.showNextView }))
  }

  setDirections = (destination) => {
    const {
      userLocation
    } = this.state

    if (!userLocation) {
      this.setError('Could not get your location')
    }

    const DirectionsService = new google.maps.DirectionsService()

    DirectionsService.route({
      origin: new google.maps.LatLng(userLocation.lat, userLocation.lng),
      destination: new google.maps.LatLng(destination.lat, destination.lng),
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        })
      } else {
        this.setError('Could not find any directions...')
      }
    })
  }

  returnToDefaultAfterPageClose = () => {
    getUserPosition(this)
    this.removeCurrentEvent()
  }

  setError = (msg) => {
    const randomId = String(Math.random() * 100000)
    this.setState({ error: { id: randomId, msg } })

    // Automatically remove the error
    setTimeout(() => {
      // Check that component still exists before trying to access it's state
      if (this.map) {
        this.setState({ error: null })
      }
    }, 4000) // 4 seconds
  }

  /*
    handlePlaces code was taken from react-google-maps examples.
  */

  handlePlaces = () => {
    const places = this.searchBox.getPlaces()
    const bounds = new window.google.maps.LatLngBounds()

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })

    const nextMarkers = places.map(place => ({
      position: place.geometry.location
    }))
    const nextCenter = nextMarkers[0] ? nextMarkers[0].position : this.state.center

    this.setState({
      center: nextCenter,
      bounds
    })

    const latLng = {
      lat: nextCenter.lat(),
      lng: nextCenter.lng()
    }
    this.map.fitBounds(bounds)

    // Use debounced version to prevent rate limit issues
    this.debouncedGetEvents(latLng)
  }

  // Called once when map first becomes idle - loads initial events
  onMapIdle = () => {
    if (!this.state.hasLoadedInitial && this.map) {
      this.setState({ hasLoadedInitial: true })
      const center = this.map.getCenter()
      if (center) {
        // Load events for current map center (works even if user declined location)
        this.getEvents({
          lat: center.lat(),
          lng: center.lng()
        })
      }
    }
  }

  onZoomChanged = () => {
    this.setState({
      zoom: this.map.getZoom(),
      mapRadius: this.getBoundsRadius(this.map.getBounds())
    })

    const center = this.map.getCenter()
    // Use debounced version to prevent rapid-fire API calls when scrolling
    this.debouncedGetEvents({
      lat: center.lat(),
      lng: center.lng()
    })
  }

  // Accept google map bounds object (coordinates) and calculates screen radius in metres
  getBoundsRadius(bounds) {
    // r = radius of the earth in km
    const r = 6378.8
    // degrees to radians (divide by 57.2958)
    const ne_lat = bounds.getNorthEast().lat() / 57.2958
    const ne_lng = bounds.getNorthEast().lng() / 57.2958
    const c_lat = bounds.getCenter().lat() / 57.2958
    const c_lng = bounds.getCenter().lng() / 57.2958
    // distance = circle radius from center to Northeast corner of bounds
    const r_km = r * Math.acos(
      Math.sin(c_lat) * Math.sin(ne_lat) +
      Math.cos(c_lat) * Math.cos(ne_lat) * Math.cos(ne_lng - c_lng)
    )
    return r_km * 1000 // radius in meters
  }

  onDragEnd = () => {
    const center = this.map.getCenter()
    // Use debounced version to prevent rapid-fire API calls
    this.debouncedGetEvents({
      lat: center.lat(),
      lng: center.lng()
    })
  }

  loadMoreEvents = () => {
    // Increase the number of events shown in the list by 30
    this.setState(prevState => ({
      listDisplayCount: prevState.listDisplayCount + 30
    }))
  }

  openMoreInfo = (event) => {
    window.cachedDataForPage = event // store data in cache to prevent another call to the server.
    window.previousStateOfMap = this.state // store state so users can easly return to his previous position

    // Reset
    window.previousStateOfMap.showFilters = false
    window.previousStateOfMap.filteredEvents = null

    this.props.history.push('/page/' + event._id)
  }

  getEvents = (location, skip = 0, limit = 10000) => {
    const {
      userLocation,
      mapRadius
    } = this.state

    const location_ = location || userLocation

    // return events within 100km, or 120% of the screen radius, whichever is greater
    const distance_ = Math.max(1.2 * mapRadius, 100000)

    if (location_) {
      const data = {
        skip,
        limit,
        location: location_,
        distance: distance_
      }

      this.setState({ isFetching: true, listDisplayCount: 30 }) // Reset list pagination on new fetch
      
      // Retry logic for rate limit errors (500 Internal Server Error)
      const callWithRetry = (methodName, retryCount = 0) => {
        const maxRetries = 3
        const retryDelay = 1500 * (retryCount + 1) // 1.5s, 3s, 4.5s
        
        Meteor.call(methodName, data, (err, res) => {
          if (!err) {
            this.setState({
              events: res,
              filteredEvents: res,
              isFetching: false
            })
            this.memoizeLocations = {} // reset caching
          } else if (err.error === 500 && retryCount < maxRetries) {
            // Rate limited - retry after delay
            console.log(`Rate limited, retrying in ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`)
            setTimeout(() => callWithRetry(methodName, retryCount + 1), retryDelay)
          } else {
            console.error(`Error loading events:`, err)
            this.setError('Failed to load events. Please refresh the page.')
            this.setState({ events: [], filteredEvents: [], isFetching: false })
          }
        })
      }
      
      if (this.state.showPastEvents) {
        callWithRetry('Events.getEvents')
      } else {
        callWithRetry('Events.getFutureEvents')
      }
    }
  }
}
// Wrap with Google Maps HOCs
const MapComponent = withScriptjs(withGoogleMap(MapComponent_))

// Separate component for when Google Maps is already loaded (avoids double-loading)
const MapComponentNoScript = withGoogleMap(MapComponent_)

class Map_ extends Component {
  render() {
    const standaloneMode = !inIFrame()
    const { key } = Meteor.settings.public.gm
    const url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&v=3.exp&libraries=places'

    const containerClass = standaloneMode ? 'offset-standalone-menu' : undefined

    // If Google Maps is already loaded, use MapComponentNoScript to avoid double-loading
    // This prevents "Element already defined" errors
    if (window.google && window.google.maps) {
      return (
        <MapComponentNoScript
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div id='map-container' className={containerClass} />}
          mapElement={<div id='map' />}
          history={this.props.history}
        />
      )
    }

    // First load - use withScriptjs to load Google Maps
    return (
      <MapComponent
        googleMapURL={url}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div id='map-container' className={containerClass} />}
        mapElement={<div id='map' />}
        history={this.props.history}
      />
    )
  }
}

export default Map_
export {
  MapComponent_
}
