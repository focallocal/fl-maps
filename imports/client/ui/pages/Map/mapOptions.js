/* Define options for the map component */
import mapStyles from './mapStyles'

export default function options () {
  return {
    styles: mapStyles,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.LEFT_BOTTOM
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  }
}
