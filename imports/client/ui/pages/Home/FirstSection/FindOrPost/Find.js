import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { FormGroup, Label, InputGroup, Input, Button } from 'reactstrap'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GeolocationHelpModal from './GeolocationHelpModal'

class Find extends Component {
  state = {
    error: null,
    geoHelp: false,
    isGettingLocation: false,
    position: null,
    search: ''
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      if (window.google) {
        clearInterval(this.interval)
        this.setState({})
      }
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.interval = null
  }

  componentDidUpdate (prevProps, prevState) {
    const { error, position } = this.state

    if (error || position) { // location retrieved
      NProgress.done()
    }
  }

  render () {
    const {
      error,
      geoHelp,
      isGettingLocation,
      search,
      position
    } = this.state

    if (position) {
      return <Redirect to='/map' />
    }

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
          <Button onClick={this.findBySearch} disabled={isGettingLocation}>Find</Button>
        </InputGroup>
        {error && <div className='error-msg'>Couldn't find anything..</div>}

        <div className='divider'>Or</div>

        <div className='center'>
          <Button onClick={this.findByCurrentLocation}>Use Current Location</Button>
          <div className='geolocation-help' onClick={this.toggleGeolocationHelp}>Not working?</div>
        </div>

        <GeolocationHelpModal isOpen={geoHelp} toggle={this.toggleGeolocationHelp} />
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
          window.__savedUserLocation = { lat, lng }
          this.setState({ position: true })
        })
        .catch(() => {
          this.setState({ error: true, isGettingLocation: false })
        })
    } else {
      // If search with empty value
      this.setState({ error: true })
    }
  }

  findByCurrentLocation = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(({ coords }) => {
        NProgress.set(0.4)

        // Save position and retrieve on map component
        window.__savedUserLocation = {
          lat: coords.latitude,
          lng: coords.longitude,
          userLocation: true
        }
        this.setState({ position: true })
      })
    }
  }

  toggleGeolocationHelp = () => {
    this.setState(prevState => (this.setState({ geoHelp: !prevState.geoHelp })))
  }
}

export default Find
