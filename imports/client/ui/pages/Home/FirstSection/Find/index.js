import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { FormGroup, Label, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import getUserPosition, { getCurrentLocation, storeUserLocation } from '/imports/client/utils/location/getUserPosition'
import i18n from '/imports/both/i18n/en'
import { inIFrame } from 'dcs-client'

const FirstI18N = i18n.Home.first_section
const standaloneMode = !inIFrame()
const { form } = FirstI18N

class Find extends Component {
  state = {
    error: null,
    isGettingLocation: false,
    userLocation: null,
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
      isGettingLocation,
      userLocation,
      search
    } = this.state

    if (userLocation) {
      window.previousStateOfMap = undefined
      return <Redirect to='/map' />
    }

    return (
      <FormGroup className='find-wrapper'>
        {/*<Label for='find'>{i18n.Home.find_events}</Label>*/}
        {
          standaloneMode ? 
            <CategoryLinkComponent /> :
            <CategoryHrefComponent />
        }

        {
          standaloneMode ?
            <GatherLinkComponent search={search} error={error} isGettingLocation={isGettingLocation}/> :
            <GatherHrefComponent search={search} error={error} isGettingLocation={isGettingLocation}/>
        }

        {/*
        <div className='divider'>Or</div>
        <div className='center'>
          <Button onClick={this.findByCurrentLocation}>
            Use Current Location
          </Button>
        </div>
        */}
      </FormGroup>
    )
  }

  findBySearch = () => {
    const { search } = this.state
    if (search.trim().length > 0) {
      NProgress.set(0.4) // set progressbar

      this.setState({ isGettingLocation: true }) // activates loading indicator
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
    getCurrentLocation(this) // will update state with latLng/error object
  }

  handleSearch = ({ target }) => {
    this.setState({ search: target.value })
  }

  removeError = () => this.setState({ error: false })

  handleKeyPress = (event) => {
    if (event.key === 'Enter') this.findBySearch()
  }

  globalSearch = () => {

  }
}

const CategoryLinkComponent = () => {
  return (
    <Link to="/" target="_top" className="link">
      <InputGroup>
        <Input
          placeholder={form.global_search.text_input.placeholder}
        />
        <Button>
          {form.global_search.button.text}
        </Button>
      </InputGroup>
      {/* {error && <div className='error-msg'>Could not find anything..</div>} */}
     </Link>
  )
}

const GatherLinkComponent = ({search, error, isGettingLocation}) => {
  return (
    <Link to="/map" target="_top" className="link">
      <InputGroup>
        <Input
          id='find'
          type='text'
          value={search}
          invalid={error}
          placeholder={form.local_search.text_input.placeholder}
          onChange={this.handleSearch}
          onFocus={this.removeError}
          onKeyPress={this.handleKeyPress}
        />
        <Button onClick={this.findBySearch} disabled={isGettingLocation}>
          {form.local_search.button.text}
        </Button>
      </InputGroup>
    </Link>
  )
}

const CategoryHrefComponent = () => {
  return (
    <a href='https://publichappinessmovement.com/categories' target="_top" className="link">
      <InputGroup>
        <Input
          placeholder={form.global_search.text_input.placeholder}
        />
        <Button>
          {form.global_search.button.text}
        </Button>
      </InputGroup>
      {/* {error && <div className='error-msg'>Could not find anything..</div>} */}
    </a>
  )
}

const GatherHrefComponent = ({search, error, isGettingLocation}) => {
  return (
    <a href='https://publichappinessmovement.com/docuss/m_gather' target="_top" className="link">
      <InputGroup>
        <Input
          id='find'
          type='text'
          value={search}
          invalid={error}
          placeholder={form.local_search.text_input.placeholder}
          onChange={this.handleSearch}
          onFocus={this.removeError}
          onKeyPress={this.handleKeyPress}
        />
        <Button onClick={this.findBySearch} disabled={isGettingLocation}>
          {form.local_search.button.text}
        </Button>
      </InputGroup>
    </a>
  )
}

export default Find
