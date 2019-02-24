import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import Linkify from 'linkifyjs/react'
import i18n_ from '/imports/both/i18n/en/map.json'
// import AttendingButton from './../../../Page/AttendingButton'  <-- currently disabled
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

    return { event: nEvent }
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
      userLocation,
      history,
      user
    } = this.props

    // set Linkify to replace URL strings with clickable link
    // needs text string to be wrapped in Linkify component
    const linkifyOption = {
      format: (value, type) => {
        if (type === 'url') return 'External Link'
      }
    }

    const isLoggedIn = !!user

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
        <header>
          <div className='back-btn'>
            <i className='fas fa-long-arrow-alt-left' onClick={this.props.returnToList}/>
          </div>
          <Button color='secondary' onClick={this.openMoreInfo}>More</Button>
        </header>

        <div className='first-section'>
          <div className='title'>{event.name}</div>
          <div className='categories'>{categories}</div>
          <div className='distance'>{distance}</div>
          {/*
          <Button color='primary' onClick={this.getDirections}>Get Directions</Button>
          */}
          {/* attending button currently inactive until able to work with both maps:
            <AttendingButton _id={event._id} history={history} isLoggedIn={isLoggedIn} user={user}/> */}
        </div>

        <hr className='divider' />

        <div className='second-section'>
          <div className='title'>Date and Time</div>
          <HoursFormatted data={event.when} />
        </div>

        <hr className='divider' />

        <div className='third-section'>
          <div className='title'>{i18n_.eventInfo.introTitle}</div>
          <div className='overview'><Linkify options={linkifyOption}>{event.overview}</Linkify></div>
          {/* <div className='overview'>{event.overview}</div> */}
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

  openMoreInfo = () => {
    const {
      event,
      openMoreInfo
    } = this.props

    openMoreInfo(event)
  }
}

EventInfo.propTypes = {
  event: PropTypes.object,
  onDirections: PropTypes.func.isRequired,
  openMoreInfo: PropTypes.func.isRequired,
  userLocation: PropTypes.object,
  returnToList: PropTypes.func.isRequired
}

export default withTracker(props => {
  return {
    user: Meteor.user()
  }
})(EventInfo)
