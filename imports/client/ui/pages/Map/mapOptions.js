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
    mapTypeControl: false
  }
}

export const circle = {
  path: 'M 0, 0 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0',
  strokeColor: 'black',
  strokeWeight: 2,
  fillColor: null,
  fillOpacity: 1,
  scale: 4
}
