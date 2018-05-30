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

export const icon = {
  path: 'M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z',
  strokeColor: 'rgba(50, 50, 50, .9)',
  strokeWeight: 0.6,
  fillColor: null,
  fillOpacity: 1
}
