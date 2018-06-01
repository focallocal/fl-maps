
export default function getUserPosition (context) {
  /*
    Several methods to get the user's location
  */

  // Get from a different component that has redirected to the map
  if (window.__savedUserLocation) {
    updateState(context, window.__savedUserLocation)
    window.__savedUserLocation = undefined
  }

  // Get from cache
  const savedLocation = sessionStorage.getItem('userLocation')
  if (savedLocation) {
    updateState(context, JSON.parse(savedLocation, (k, v) => parseFloat(v))) // ensure values are float numbers
  }

  // Get location from geolcation api
  if (!context.state.userLocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const latLng = {
        lat: coords.latitude,
        lng: coords.longitude
      }

      if (context._isMounted) { // set/remove on componentDidMount/componentWillUnmount
        updateState(context, latLng)
      }

      storeUserLocation(latLng)
    })
  }
}

const updateState = (context, latLng) => context.setState({
  center: latLng,
  userLocation: latLng,
  zoom: 12
})

export function storeUserLocation (location) {
  sessionStorage.setItem('userLocation', JSON.stringify(location))
  window.__savedUserLocation = location
}
