import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import mapOptions from './mapOptions'
import MapContainer from './MapContainer'
import './styles.scss'

const MapComponent = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 46, lng: -43 }}
      defaultOptions={mapOptions()}
    />
  )
}))

class Map_ extends Component {
  render () {
    const { key } = Meteor.settings.public.gm

    return (
      <MapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<MapContainer />}
        mapElement={<div id='map' />}
      />
    )
  }
}

export default Map_
