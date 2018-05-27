import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Redirect } from 'react-router-dom'
import { FormGroup, Label, InputGroup, Input, Button } from 'reactstrap'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GeolocationHelpModal from './GeolocationHelpModal'

class Find extends Component {
  state = {
    search: '',
    error: null,
    position: null,
    geoHelp: false
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

  UNSAFE_componentWillUpdate (nextProps, nextState) {
    const { error, position } = nextState

    if (error || position) { // fetching completed
      NProgress.done()
    }
  }

  render () {
    const {
      search,
      error,
      position,
      geoHelp
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
          <Button onClick={this.findBySearch}>Find</Button>
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

      geocodeByAddress(search)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          sessionStorage.setItem('position', JSON.stringify({ lat, lng }))
          this.setState({ position: true })
        })
        .catch(() => {
          this.setState({ error: true })
        })
    } else {
      this.setState({ error: true })
    }
  }

  findByCurrentLocation = () => {
    const { navigator } = window

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        NProgress.set(0.4)

        // Save position and retrieve on map component
        const position = {
          lat: coords.latitude,
          lng: coords.longitude,
          userLocation: true
        }

        sessionStorage.setItem('position', JSON.stringify(position))
        this.setState({ position: true })
      })
    }
  }

  toggleGeolocationHelp = () => {
    this.setState(prevState => (this.setState({ geoHelp: !prevState.geoHelp })))
  }
}

export default Find
