import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { Input } from 'reactstrap'
import Events from '/imports/both/collections/events'
import mapOptions, { circle } from './mapOptions'
import EventInfo from './EventInfo'
import NewEvent from './NewEvent'
import './styles.scss'

class MapComponent_ extends Component {

  state = {
    bounds: null,
    center: { lat: 46, lng: -43 },
    currentEventInfo: null
  }

  render () {
    const {
      bounds,
      center,
      currentEventInfo
    } = this.state

    const {
      events
    } = this.props

    return (
      <GoogleMap
        ref={ref => this.map = ref}
        center={center}
        defaultZoom={3}
        defaultOptions={mapOptions()}
      >
        <SearchBox
          ref={ref => this.searchBox = ref}
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.handlePlaces}
        >
          <Input id='google-maps-searchbox' type="text" placeholder="Search" />
        </SearchBox>

        <MarkerClusterer
          onClick={this.onMarkerClustererClick}
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {events.map(event => {

            if (Meteor.isDevelopment && !event.address) { return } // react-hot-loader bug fix
            const fillColor = event.categories.length > 1 ? '#d09d7a' : event.categories[0].color

            return (
              <Marker
                key={event._id}
                position={{ lat: event.address.lat, lng: event.address.lng }}
                icon={{ ...circle, fillColor }}
                onClick={() => this.toggleInfoWindow(event._id)}
                id={event._id}
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
        <NewEvent />
      </GoogleMap>
    )
  }

  onMarkerClustererClick = () => {
    return (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
    }
  }

  toggleInfoWindow = (_id) => {
    this.setState({ currentEventInfo: _id || null })
  }

  handleBounds = () => {
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter()
    })
  }

  handlePlaces = () => {
    const places = this.searchBox.getPlaces();
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });
    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));
    const nextCenter = nextMarkers[0] ? nextMarkers[0].position : this.state.center

    this.setState({
      center: nextCenter,
      markers: nextMarkers,
    })

    this.map.fitBounds(bounds);
  }
}
const MapComponent = withScriptjs(withGoogleMap(MapComponent_))

class Map_ extends Component {
  render () {
    const { key } = Meteor.settings.public.gm

    return (
      <MapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div id='map-container' />}
        mapElement={<div id='map' />}
        events={this.props.events}
      />
    )
  }
}

export default withTracker(() => {
  Meteor.subscribe('Events.getEvents')

  return {
    events: Events.find({}).fetch()
  }
})(Map_)
