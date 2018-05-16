import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { FormGroup, Label, InputGroup, Input, Button } from 'reactstrap'

class Find extends Component {
  state = {
    position: null
  }

  render () {
    const {
      position
    } = this.state

    if (position) {
      return <Redirect to='/map' />
    }

    return (
      <FormGroup className='find-wrapper'>
        <Label for='find'>Find resources around the world.</Label>
        <InputGroup>
          <Input type='text' id='find' placeholder='Enter city, state or zipcode' />
          <Button>Find</Button>
        </InputGroup>

        <div className='divider'>Or</div>

        <div className='center'>
          <Button onClick={this.findByCurrentLocation}>Use Current Location</Button>
        </div>
      </FormGroup>
    )
  }

  findBySearch = () => {

  }

  findByCurrentLocation = () => {
    const { navigator } = window

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        // Save position and retrieve on map component

        const position = {
          lat: coords.latitude,
          lng: coords.longitude,
          userLocation: true
        }

        sessionStorage.setItem('position', JSON.stringify(position))
        this.setState({ position })
      })
    } else {
      // not supported
    }
  }
}

Find.propTypes = {

}

export default Find
