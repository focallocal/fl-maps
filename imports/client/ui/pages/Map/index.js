import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { Input } from 'reactstrap'
import mapOptions from './mapOptions'
import EventsList from './EventsList'
import FiltersList from './EventsFilter'
import SearchButtons from './SearchButtons'
import MarkerWrapper from './MarkerWrapper'
import { ensureUniquePosition, getUserPosition } from './utils'
import './styles.scss'
import './mobile-styles.scss'

class MapComponent_ extends Component {
  constructor () {
    super()
    this.state = {
      bounds: null,
      center: { lat: 46, lng: -43 },
      currentEvent: null,
      events: [],
      filteredEvents: null,
      isFetching: true,
      showFilters: false,
      userLocation: null,
      zoom: 3
    }
  }

  memoizeLocations = {} // cache locations

  componentDidMount () {
    this.toggleBodyOverflow()
    getUserPosition(this)
    this.callGetEvents()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.interval = null
    this.toggleBodyOverflow()
  }

  render () {
    const {
      center,
      currentEvent,
      events,
      filteredEvents,
      isFetching,
      showFilters,
      userLocation,
      zoom
    } = this.state

    const events_ = filteredEvents || events

    return (
      <GoogleMap
        ref={ref => this.map = ref}
        center={center}
        zoom={zoom}
        defaultZoom={zoom}
        defaultOptions={mapOptions()}
        onZoomChanged={this.onZoomChanged}
      >

        <MarkerClusterer
          onClick={this.onMarkerClustererClick}
          averageCenter
          enableRetinaIcons
          gridSize={60}
          maxZoom={20}
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
          events={events_}
          userLocation={userLocation}
          isFetching={isFetching}
          onItemClick={this.onMarkerClick}
        >
          <StandaloneSearchBox
            ref={ref => this.searchBox = ref}
            onPlacesChanged={this.handlePlaces}
          >
            <Fragment>
              <Input id='google-maps-searchbox' type="text" placeholder="Search" />
              <SearchButtons
                toggleFilters={this.toggleFiltersList}
              />
            </Fragment>
          </StandaloneSearchBox>
        </EventsList>

        {userLocation && <Marker position={userLocation} />}
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

  /*
    handleBounds and handlePlaces code was taken from react-google-maps examples.
  */

  handleBounds = () => {
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter()
    })
  }

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
      center: nextCenter
    })

    const latLng = {
      lat: nextCenter.lat(),
      lng: nextCenter.lng()
    }

    this.getEvents(latLng)

    this.map.fitBounds(bounds)
  }

  onZoomChanged = () => {
    this.setState({ zoom: this.map.getZoom() })
  }

  callGetEvents = () => {
    let startingTime = Date.now()

    this.interval = setInterval(() => {
      const { userLocation } = this.state

      if (this.interval && userLocation) {
        clearInterval(this.interval)
        this.getEvents() // Fetch events from server
        return
      }

      if (Date.now() - startingTime > 6000) { // after 6 seconds remove the interval
        clearInterval(this.interval)
      }
    }, 1500) // run 4 times 6000 / 1500
  }

  getEvents = (location, skip = 0, limit = 20) => {
    const {
      userLocation
    } = this.state

    if (location || userLocation) {
      const data = {
        skip,
        limit,
        location: location || userLocation
      }

      this.setState({ isFetching: true })
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
    }
  }

  toggleBodyOverflow () {
    document.querySelector('body').classList.toggle('overflow')
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
        mapElement={<div id='map' className='minimized' />}
      />
    )
  }
}

export default Map_
