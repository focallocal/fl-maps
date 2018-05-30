
export default function getUserPosition (context) {
  // Get position from a different component that redirects to the map
  let latLng
  const position = sessionStorage.getItem('position')
  if (position) {
    try {
      const { userLocation, ...coords } = JSON.parse(position)
      latLng = {
        lng: parseFloat(coords.lng),
        lat: parseFloat(coords.lat)
      }
      context.setState({
        center: latLng,
        zoom: 12,
        userLocation: latLng
      })
      return
    } catch (ex) { /* fail silently */ }

    sessionStorage.removeItem('position')
  }

  // Get location from geolcation api
  if (!context.state.userLocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      latLng = {
        lat: coords.latitude,
        lng: coords.longitude
      }

      context.setState({
        center: latLng,
        zoom: 12,
        userLocation: latLng
      })
    })
  }
}
