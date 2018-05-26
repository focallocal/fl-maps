import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { Input } from 'reactstrap'
import mapOptions, { circle } from './mapOptions'
import EventInfo from './EventInfo'
import EventsList from './EventsList'
import FiltersList from './EventsFilter'
import SearchButtons from './SearchButtons'
import './styles.scss'
import './mobile-styles.scss'

class MapComponent_ extends Component {
  constructor () {
    super()
    this.state = {
      bounds: null,
      center: { lat: 46, lng: -43 },
      currentEventInfo: null,
      events: [],
      filteredEvents: null,
      isFetching: true,
      showFilters: false,
      userLocation: null,
      zoom: 3
    }
  }

  componentDidMount () {
    this.toggleBodyOverflow()
    this.getUserPosition()

    let startingTime = Date.now()
    this.interval = setInterval(() => {
      const { userLocation } = this.state

      if (this.interval && userLocation) {
        clearInterval(this.interval)
        this.getEvents() // Fetch events from server
        return
      }

      if (Date.now() - startingTime > 6000) {
        clearInterval(this.interval)
      }
    }, 1500)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.interval = null
    this.toggleBodyOverflow()
  }

  render () {
    const {
      bounds,
      center,
      currentEventInfo,
      events,
      isFetching,
      filteredEvents,
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
          maxZoom={8}
        >
          {events_.map(event => {
            if (Meteor.isDevelopment && !event.address) { return } // react-hot-loader bug fix
            const fillColor = event.categories.length > 1 ? '#d09d7a' : event.categories[0].color
            const {
              coordinates
            } = event.address.location

            return (
              <Marker
                key={event._id}
                position={{ lng: coordinates[0], lat: coordinates[1] }}
                icon={{ ...circle, fillColor }}
                onClick={e => this.toggleInfoWindow(e, event._id)}
              >
                {currentEventInfo === event._id && (
                  <InfoWindow onCloseClick={() => this.toggleInfoWindow(null)}>
                    <EventInfo event={event} fillColor={fillColor} />
                  </InfoWindow>
                )}
              </Marker>
            )
          })}
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
          toggleInfoWindow={this.toggleInfoWindow}
        >
          <StandaloneSearchBox
            ref={ref => this.searchBox = ref}
            bounds={bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
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

        {userLocation && (
          <Marker
            position={userLocation}
          />
        )}
      </GoogleMap>
    )
  }

  toggleInfoWindow = (e, _id, center) => {
    if (!e) {
      this.setState({ currentEventInfo: null })
    } else {
      const currentZoom = this.map.getZoom()

      this.setState({
        center: center || e.latLng.toJSON(),
        zoom: currentZoom < 18 ? 18 : currentZoom + 1,
        currentEventInfo: _id
      })
    }
  }

  toggleFiltersList = () => {
    this.setState({ showFilters: !this.state.showFilters })
  }

  setFilteredEvents = events => {
    // console.log(events)
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
      center: nextCenter,
      markers: nextMarkers
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

  getUserPosition () {
    // Get position from a different component that redirects to the map
    let latLng
    const position = sessionStorage.getItem('position')
    if (position) {
      try {
        const { userLocation, ...coords } = JSON.parse(position)
        latLng = {
          lng: parseFloat(coords.lng),
          lat: parseFloat(coords.lat)
        }
        return this.setState({
          center: latLng,
          zoom: 12,
          userLocation: latLng
        })
      } catch (ex) { /* fail silently */ }

      sessionStorage.removeItem('position')
    }

    // Get location from geolcation api
    if (!this.state.userLocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        latLng = {
          lat: coords.latitude,
          lng: coords.longitude
        }

        this.setState({
          center: latLng,
          zoom: 12,
          userLocation: latLng
        })
      })
    }
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
    const { api_key } = Meteor.settings.public.gm
    const url = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&v=3.exp&libraries=places'

    return (
      <MapComponent
        googleMapURL={!window.google ? url : '-'}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div id='map-container' />}
        mapElement={<div id='map' />}
      />
    )
  }
}

export default Map_
