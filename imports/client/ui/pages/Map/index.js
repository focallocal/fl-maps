import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { Alert, Input } from 'reactstrap'
import getUserPosition from '/imports/client/utils/location/getUserPosition'
import { toggleBodyOverflow } from '/imports/client/utils/DOMInteractions'
import mapOptions from './mapOptions'
import EventsList from './EventsList'
import FiltersList from './EventsFilter'
import SearchButtons from './SearchButtons'
import MarkerWrapper from './MarkerWrapper'
import { ensureUniquePosition } from './utils'
import './styles.scss'
import './mobile-styles.scss'

class MapComponent_ extends Component {
  constructor () {
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
      userLocation: null,
      zoom: 3,
      mapRadius: null,
      showPastEvents: false
    }
  }

  memoizeLocations = {} // cache locations

  componentDidMount () {
    getUserPosition(this)

    if (window.previousStateOfMap) {
      this.setState({ ...window.previousStateOfMap })
    }

    window.__setDocumentTitle('Map')
    toggleBodyOverflow()
    this._isMounted = true // don't remove that line
  }

  componentWillUnmount () {
    toggleBodyOverflow()
    this._isMounted = false // don't remove that line
  }

  componentDidUpdate (nextProps, prevState) {
    const {
      userLocation,
      userLocationError
    } = this.state

    if (!prevState.userLocation && userLocation) {
      this.getEvents()
    }

    if (!prevState.userLocationError && userLocationError) {
      this.setState({ isFetching: false })
    }

    if (prevState.showPastEvents !== this.state.showPastEvents) {
      this.getEvents()
    }
  }

  render () {
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
      zoom
    } = this.state

    const { history } = this.props 
    
    const events_ = filteredEvents || events

    return (
      <GoogleMap
        ref={ref => this.map = ref}
        center={center}
        zoom={zoom}
        defaultZoom={zoom}
        defaultOptions={mapOptions()}
        onZoomChanged={this.onZoomChanged}
        onDragEnd={this.onDragEnd}
      >

        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
          maxZoom={20}
          onClick={this.onMarkerClustererClick}
        >
          {events_.map((event, i) =>
            <MarkerWrapper
              key={event._id}
              event={event}
              isCurrent={currentEvent === event._id}
              onMarkerClick={this.onMarkerClick}
              position={ensureUniquePosition(this.memoizeLocations, event, events_)}
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
          events={events_}
          isFetching={isFetching}
          onItemClick={this.onMarkerClick}
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

  onMarkerClick = (_id) => {
    const { latLng, overlapping: ol } = this.memoizeLocations[_id]
    const cachedSet = this.memoizeLocations[`${latLng.lng}${latLng.lat}`]

    let overlapping = ol
    if (cachedSet && cachedSet.size > 1) {
      overlapping = true
    }

    setTimeout(() => {
      this.map.panTo(latLng)
    }, 35)

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

    this.getEvents(latLng)
  }

  onZoomChanged = () => {
    this.setState({
      zoom: this.map.getZoom(),
      mapRadius: this.getBoundsRadius(this.map.getBounds())
    })

    const center = this.map.getCenter()
    this.getEvents({
      lat: center.lat(),
      lng: center.lng()
    })
  }

  // Accept google map bounds object (coordinates) and calculates screen radius in metres
  getBoundsRadius (bounds) {
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
    this.getEvents({
      lat: center.lat(),
      lng: center.lng()
    })
  }

  openMoreInfo = (event) => {
    window.cachedDataForPage = event // store data in cache to prevent another call to the server.
    window.previousStateOfMap = this.state // store state so users can easly return to his previous position

    // Reset
    window.previousStateOfMap.showFilters = false
    window.previousStateOfMap.filteredEvents = null

    this.props.history.push('/page/' + event._id)
  }

  getEvents = (location, skip = 0, limit = 30) => {
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

      this.setState({ isFetching: true })
      if (this.state.showPastEvents) {
        Meteor.call('Events.getEvents', data, (err, res) => {
          if (!err) {
            this.setState({
              events: res,
              filteredEvents: res
            })
            this.memoizeLocations = {} // reset caching
          }

          this.setState({ isFetching: false })
        })
      } else {
        Meteor.call('Events.getFutureEvents', data, (err, res) => {
          if (!err) {
            this.setState({
              events: res,
              filteredEvents: res
            })
            this.memoizeLocations = {} // reset caching
          }

          this.setState({ isFetching: false })
        })
      }
    }
  }
}
const MapComponent = withScriptjs(withGoogleMap(MapComponent_))

class Map_ extends Component {
  render () {
    const { key } = Meteor.settings.public.gm
    const url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&v=3.exp&libraries=places'

    return (
      <MapComponent
        googleMapURL={!window.google ? url : '-'}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div id='map-container' />}
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
