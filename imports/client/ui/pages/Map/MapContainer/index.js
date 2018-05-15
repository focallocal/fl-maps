/*
  This components responsible for rendering additional elements on the map
*/

import React from 'react'
import NewEvent from '../NewEvent'
import PlacesAutocomplete, { getLatLng } from 'react-places-autocomplete'
import { Input } from 'reactstrap'
import SearchBox from '../SearchBox'

// Always render the children prop - it contains the map element.
const MapContainer = ({ children }) => (
  <div id='map-container'>
    {children}
    <NewEvent />
    <SearchBox
      onSelect={() => {}}
    />
  </div>
)

export default MapContainer
