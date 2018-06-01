
export default function getUserPosition (context) {
  // Get position from a different component that redirects to the map

  const latLng = window.__savedUserLocation
  if (latLng) {
    context.setState({
      center: latLng,
      zoom: 12,
      userLocation: latLng
    })
    window.__savedUserLocation = undefined
  }

  // Get location from geolcation api
  if (!context.state.userLocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const latLng_ = {
        lat: coords.latitude,
        lng: coords.longitude
      }

      context.setState({
        center: latLng_,
        zoom: 12,
        userLocation: latLng_
      })
    })
  }
}
