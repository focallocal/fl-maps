import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { FormGroup, Label, InputGroup, Input, Button } from 'reactstrap'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import getUserPosition, { storeUserLocation } from '/imports/client/utils/location/getUserPosition'
import GeolocationHelpModal from './GeolocationHelpModal'

class Find extends Component {
  state = {
    error: null,
    geoHelp: false,
    isGettingLocation: false,
    userLocation: null,
    userLocationError: false,
    search: ''
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    const {
      error,
      geoHelp,
      isGettingLocation,
      userLocation,
      userLocationError,
      search
    } = this.state

    if (userLocation) {
      return <Redirect to='/map' />
    }

    const showGeoHelpModal = geoHelp || userLocationError

    return (
      <FormGroup className='find-wrapper'>
        <Label for='find'>Find resources around the world.</Label>
        <InputGroup>
          <Input
            id='find'
            type='text'
            value={search}
            invalid={error}
            placeholder='Enter city, state or zipcode'
            onChange={this.handleSearch}
            onFocus={this.removeError}
          />
          <Button onClick={this.findBySearch} disabled={isGettingLocation}>
            Find
          </Button>
        </InputGroup>
        {error && <div className='error-msg'>Couldn't find anything..</div>}

        <div className='divider'>Or</div>

        <div className='center'>
          <Button onClick={this.findByCurrentLocation}>
            Use Current Location
          </Button>
          <div className='geolocation-help' onClick={this.toggleGeolocationHelp}>
            Not working?
          </div>
        </div>

        <GeolocationHelpModal
          isOpen={showGeoHelpModal}
          toggle={this.toggleGeolocationHelp}
        />
      </FormGroup>
    )
  }

  handleSearch = ({ target }) => {
    this.setState({ search: target.value })
  }

  removeError = () => this.setState({ error: false })

  findBySearch = () => {
    const { search } = this.state

    if (search.trim().length > 0) {
      NProgress.set(0.4)
      this.setState({ isGettingLocation: true })

      geocodeByAddress(search)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          NProgress.done()
          storeUserLocation({ lat, lng })
          this.setState({ userLocation: true })
        })
        .catch(() => {
          NProgress.done()
          this.setState({ error: true, isGettingLocation: false })
        })
    } else {
      // If search with empty value
      this.setState({ error: true })
    }
  }

  findByCurrentLocation = () => {
    getUserPosition(this) // will update state with latLng/error object
  }

  toggleGeolocationHelp = () => {
    // userLocationError might be set from '/imports/client/utils/location/getUserPosition'
    // make sure you understand that mechanism before attempting to change/understand this code

    const {
      geoHelp,
      userLocationError
    } = this.state

    let modalState = !geoHelp && !userLocationError

    this.setState({ geoHelp: modalState, userLocationError: modalState })
  }
}

export default Find
