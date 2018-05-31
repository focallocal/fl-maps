import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import * as formatUtils from '/imports/client/utils/format'
import './styles.scss'

class EventInfo extends Component {
  state = {
    animateOut: false,
    event: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const nEvent = nextProps.event
    const pEvent = prevState.event

    if ((!pEvent || pEvent) && nEvent) {
      return { event: nEvent, animateIn: true }
    }

    if (pEvent && !nEvent) {
      return { animateOut: true }
    }
  }

  componentDidUpdate () {
    /*
      Animation managment should probably be done by a dedicated library in the future.
    */

    if (this.state.animateOut) {
      setTimeout(() => {
        this.setState({ event: null, animateOut: false })
      }, 250) // 250 ms -> the transition duration defined in styles.scss
    }

    if (this.state.animateIn) {
      setTimeout(() => {
        this.setState({
          animateIn: false
        })
      }, 1)
    }
  }

  render () {
    const {
      animateIn,
      animateOut,
      event
    } = this.state

    const {
      minimized,
      userLocation
    } = this.props

    if (!event) { return null }

    const categories = formatUtils.formatCategories(event.categories)
    const distance = formatUtils.formatMilesFromLocation(userLocation, event.address.location.coordinates)

    const minimizedClass = minimized ? 'minimized' : ''
    const activeClass = event ? 'active' : ''
    const activeOutClass = animateOut ? 'out' : ''
    const beforeInClass = animateIn ? 'before-in' : ''

    const classes = [minimizedClass, activeClass, activeOutClass, beforeInClass].join(' ')

    return (
      <div id='event-info' className={classes}>
        <div className='back-btn'>
          <i className='fas fa-long-arrow-alt-left' onClick={this.props.returnToList}/>
        </div>

        <div className='first-section'>
          <div className='title'>{event.name}</div>
          <div className='categories'>{categories}</div>
          <div className='distance'>{distance}</div>
          <Button color='primary' onClick={this.getDirections}>Get Directions</Button>
        </div>

        <hr className='divider' />

        <div className='second-section'>
          <div className='title'>Date and Time</div>
          <HoursFormatted data={event.when} />
        </div>

        <hr className='divider' />

        <div className='third-section'>
          <div className='title'>About</div>
          <div className='description'>{event.description}</div>
        </div>
      </div>
    )
  }

  getDirections = () => {
    const {
      coordinates
    } = this.props.event.address.location

    this.props.onDirections({ lng: coordinates[0], lat: coordinates[1] })
  }
}

EventInfo.propTypes = {
  event: PropTypes.object,
  onDirections: PropTypes.func.isRequired,
  userLocation: PropTypes.object.isRequired,
  returnToList: PropTypes.func.isRequired
}

export default EventInfo
