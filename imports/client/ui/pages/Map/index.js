import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import { Input } from 'reactstrap'
import mapOptions from './mapOptions'
import MapContainer from './MapContainer'
import NewEvent from './NewEvent'
import './styles.scss'

class MapComponent_ extends Component {
  state = {
    bounds: null,
    center: { lat: 46, lng: -43 },
    markers: []
  }

  render () {
    const {
      bounds,
      center
    } = this.state

    return (
      <GoogleMap
        ref={ref => this.map = ref}
        center={center}
        defaultZoom={3}
        defaultOptions={mapOptions()}
        onBoundsChanged={this.handleBounds}
      >
        <SearchBox
          ref={ref => this.searchBox = ref}
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.handlePlaces}
        >
          <Input id='google-maps-searchbox' type="text" placeholder="Search" />
        </SearchBox>
        <NewEvent />
      </GoogleMap>
    )
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
      />
    )
  }
}

export default Map_
