/* Define options for the map component */
import mapStyles from './mapStyles'

export default function options () {
  return {
    styles: mapStyles,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_BOTTOM
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    mapTypeControl: false,
    gestureHandling: 'greedy'
  }
}

export const icon = {
  path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
  strokeColor: 'rgba(50, 50, 50, .9)',
  strokeWeight: 0.6,
  fillColor: null,
  fillOpacity: 1
}
