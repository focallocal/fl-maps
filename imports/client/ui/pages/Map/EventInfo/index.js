import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import { formatCategories, formatWhenObject } from '/imports/client/utils/format'
import './styles.scss'

class EventInfo extends Component {
  render () {
    const {
      event,
      fillColor
    } = this.props

    const categories = formatCategories(event.categories)

    return (
      <div id='event-info-window'>
        <span className='categories' style={{ color: fillColor }}>{categories}</span>
        <div className='title'>{event.name}</div>

        <blockquote>
          <div><span>Where:</span> {event.address.name}</div>
          <div><span>Meeting point:</span> {event.findHints}</div>
          <div><span>When:</span> {formatWhenObject(event.when)}</div>
          <div>{event.overview}</div>
        </blockquote>

        <span>Looks suspicious? <span className='report'>let us know!</span></span>
        <Button color='primary'>Show More!</Button>
      </div>
    )
  }
}

EventInfo.propTypes = {
  event: PropTypes.object.isRequired,
  fillColor: PropTypes.string.isRequired
}

export default EventInfo
