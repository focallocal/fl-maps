import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { FormGroup, Label, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import getUserPosition, {getCurrentLocation, storeUserLocation} from '/imports/client/utils/location/getUserPosition'
import i18n from '/imports/both/i18n/en'

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
       <Label for='find'>{i18n.Home.find_events}</Label>
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
         <InputGroupAddon addonType='append'>
           <Button onClick={this.findBySearch} disabled={isGettingLocation}>
             Find
           </Button>
         </InputGroupAddon>
       </InputGroup>
       {error && <div className='error-msg'>Couldn't find anything..</div>}
       <div className='divider'>Or</div>
       <div className='center'>
         <Button onClick={this.findByCurrentLocation}>
           Use Current Location
         </Button>
       </div>
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
}

export default Find
