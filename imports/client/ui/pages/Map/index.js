import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import mapStyles from './mapStyles'
import MapContainer from './MapContainer'
import { Input } from 'reactstrap'
import './styles.scss'

const MapComponent = withScriptjs(withGoogleMap(props => {

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 46, lng: -43 }}
      defaultOptions={{ styles: mapStyles }}
    />
  )
}))

class Map_ extends Component {

  render () {
    const { key} = Meteor.settings.public.gm

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
