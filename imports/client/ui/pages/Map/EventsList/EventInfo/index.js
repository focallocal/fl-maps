import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import Linkify from 'linkifyjs/react'
// import i18n_ from '/imports/both/i18n/en/map.json'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import * as formatUtils from '/imports/client/utils/format'
import * as Gravatar from '/imports/client/utils/Gravatar'

import './styles.scss'
import i18n from '/imports/both/i18n/en'

let i18n_ = i18n.Map

class EventInfo extends Component {
  render () {
    const {
      userLocation,
      event,
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

    // predefine some variables that will be left blank when no event is selected
    // (need to render blank component in order to animate it)
    let categories,
      distance,
      gravatar

    if (event) {
      categories = formatUtils.formatCategories(event.categories)
      distance = formatUtils.formatMilesFromLocation(userLocation, event.address.location.coordinates)
      gravatar = Gravatar.isSpecialCategorySelected(event.categories) ? Gravatar.getGravatar(event.organiser.name, 50) : ''
    }

    return (
      <div id='event-info' className={event ? 'active' : ''}>
        <header>
          <div className='back-btn'>
            <i className='fas fa-long-arrow-alt-left' onClick={this.props.returnToList}/>
          </div>

        </header>

        <div className='first-section'>
          <img src={gravatar} className="rounded-circle float-right" alt=""/>
          <div className='title'>{event ? event.name : ''}</div>
          <div className='categories'>{categories}</div>
          <div className='distance'>{distance}</div>
          <Button color='secondary' onClick={this.openMoreInfo} block>{i18n_.openEventDetailsBtn}</Button>
        </div>

        <hr className='divider' />

        <div className='second-section'>
          <div className='title'>Date and Time</div>
          {event && <HoursFormatted data={event.when} />}
        </div>

        <hr className='divider' />

        <div className='third-section'>
          <div className='title'>{i18n_.eventInfo.introTitle}</div>
          <div className='overview'><Linkify options={linkifyOption}>{event ? event.overview : ''}</Linkify></div>
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
