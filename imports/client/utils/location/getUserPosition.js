const updateState = (context, latLng) => context.setState({
  center: latLng,
  userLocation: latLng,
  zoom: 12
})

export default function getUserPosition (context) {
  const savedLocation = sessionStorage.getItem('userLocation')
  const latLng = window.__savedUserLocation

  // Get position from a different component that has redirected to the map
  if (latLng) {
    context.setState({
      center: latLng,
      zoom: 12,
      userLocation: latLng
    })
    window.__savedUserLocation = undefined
  } else if (savedLocation) {
    updateState(context, JSON.parse(savedLocation, (k, v) => parseFloat(v))) // ensure values are float numbers
  }

  // Get location from geolcation api
  if (!context.state.userLocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const latLng_ = {
        lat: coords.latitude,
        lng: coords.longitude
      }

      if (context._isMounted) { // set/remove on componentDidMount/componentWillUnmount
        context.setState({
          center: latLng_,
          zoom: 12,
          userLocation: latLng_
        })
      }
    })
  }
}
