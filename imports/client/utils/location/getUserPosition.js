import { Meteor } from 'meteor/meteor'

export function getCurrentLocation (context) {
  if (navigator) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const latLng = {
          lat: coords.latitude,
          lng: coords.longitude
        }

        if (context._isMounted) { // set/remove on componentDidMount/componentWillUnmount
          updateState(context, latLng)
        }

        storeUserLocation(latLng)
      }, err => {
        /*
          code 1 - user clicked on "Block".
          code 2 - a problem with the geolocation service
          code 3 - timeout
        */

        if (err.code === 1) {
          // User explicitly blocked location access - remember this choice
          try {
            window.localStorage.setItem('userLocationPermission', 'denied')
          } catch (e) {}
        }

        if (err.code === 2) { // run only if there's a problem with the browser's ability to get location
          Meteor.call('General.getUserLocation', (err, res) => {
            if (!err) {
              storeUserLocation(res)
              updateState(context, res)
            } else {
              context.setState({ userLocationError: true })
            }
          })
        }
      }, { timeout: 7000 }) // if user didn't click "allow" after 7 seconds - timeout
    } else {
      console.log('Unable to load geolocation object')
    }
  } else {
    console.log('Unable to load navigator')
  }
}

export default function getUserPosition (context) {
  /*
    Several methods to get the user's location
  */

  /*
    Indicate an error if location was not retrieved after 7 seconds
  */

  setTimeout(() => {
    if (!context.state.userLocation) {
      context.setState({
        userLocationError: true
      })
    }
  }, 7000)

  // Get from a different component that has redirected to the map
  if (window.__savedUserLocation) {
    updateState(context, window.__savedUserLocation)
    window.__savedUserLocation = undefined
  }
  // Get from cache
  let savedLocation = sessionStorage.getItem('userLocation')
  if (!savedLocation) {
    // Also check localStorage so the choice persists across browser sessions
    try {
      savedLocation = window.localStorage.getItem('userLocation')
    } catch (e) {}
  }
  if (savedLocation) {
    updateState(context, JSON.parse(savedLocation, castToFloat))
  }

  // Get location from geolcation api
  if (!context.state.userLocation && !savedLocation && !window.__savedUserLocation) {
    // Respect a previously stored "denied" preference so we don't keep asking
    let permission = null
    try {
      permission = window.localStorage.getItem('userLocationPermission')
    } catch (e) {}

    if (permission !== 'denied') {
      getCurrentLocation(context)
    }
  }
}

const updateState = (context, latLng) => {
  if (!context.state.userLocationError) {
    context.setState({
      center: latLng,
      userLocation: latLng,
      userLocationError: false,
      zoom: 12
    })
  }
}

export function storeUserLocation (location) {
  const serialized = JSON.stringify(location)
  sessionStorage.setItem('userLocation', serialized)
  try {
    window.localStorage.setItem('userLocation', serialized)
    // If we successfully stored a location, we can clear any previous "denied" flag
    window.localStorage.removeItem('userLocationPermission')
  } catch (e) {}
  window.__savedUserLocation = location
}

const castToFloat = (k, v) => typeof v === 'number' ? parseFloat(v) : v
