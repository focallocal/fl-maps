import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-google-maps'
import { icon } from '../mapOptions'

class MarkerWrapper extends Component {
  state = {
    hovered: false
  }

  render () {
    const {
      hovered
    } = this.state

    const {
      event,
      isCurrent,
      position
    } = this.props

    const { latLng } = position
    const fillColor = event.categories.length > 1 ? '#d09d7a' : event.categories[0].color
    const iconScale = hovered || isCurrent ? 0.55 : 0.5
    const hightlightIcon = isCurrent ? { strokeWeight: 3 } : null
    const zIndex = isCurrent ? 9999 : 1

    return (
      <Marker
        icon={{ ...icon, fillColor, scale: iconScale, ...hightlightIcon }}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        position={latLng}
        zIndex={zIndex}
      />
    )
  }

  handleMouseOver = () => this.setState({
    hovered: true
  })

  handleMouseOut = () => this.setState({
    hovered: false
  })

  handleClick = () => {
    this.props.onMarkerClick(this.props.event._id)
  }
}

MarkerWrapper.propTypes = {
  event: PropTypes.object.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired
}

export default MarkerWrapper
