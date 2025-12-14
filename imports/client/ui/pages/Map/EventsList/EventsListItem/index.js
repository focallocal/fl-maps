import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'
import { formatMilesFromLocation, formatCategories } from '/imports/client/utils/format'
import { findNextEvent } from '/imports/client/utils/findNextEvent'
import { getFunEmojiAvatar } from '/imports/client/utils/avatarFallback'
import './styles.scss'

class ListItem extends Component {
  render () {

    const {
      item,
      userLocation,
      avatarUrl,
      ishovered,
      showNextView,
    } = this.props

    const {
      name,
      categories,
      address,
      when
    } = item

    const fallbackInitial = this.getFallbackInitial(item)
    // Use avatarUrl from parent, or generate Fun Emoji fallback (slightly smaller to match photo sizing)
    const displayAvatarUrl = avatarUrl || getFunEmojiAvatar(fallbackInitial, 70)

    const listItemClass = `event-list-item clickable-list-item ${
      ishovered ? "highlighted" : ""
    }`;

    // Format next occurrence date/time for Next view
    let nextDateTimeStr = ''
    if (showNextView && when) {
      const nextDate = this.getNextOccurrence(when)
      if (nextDate) {
        const dateStr = nextDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        const timeStr = when.startingTime || ''
        nextDateTimeStr = timeStr ? `${dateStr} ${timeStr}` : dateStr
      }
    }

    return (
      <ListGroupItem 
        id ={`event-${item._id}`}
        className={listItemClass}
        onClick={this.handleItemClick}
      >
        <div className='events-list-content'>
          <div className='name'>{name}</div>
          {showNextView && nextDateTimeStr && (
            <div className='next-date'>{nextDateTimeStr}</div>
          )}
          <div className='categories'>{formatCategories(categories)}</div>
          {!showNextView && (
            <div className={`distance ${userLocation ? 'has-distance' : 'permission-needed'}`}>{formatMilesFromLocation(userLocation, address.location.coordinates)}</div>
          )}
        </div>
        <img src={displayAvatarUrl} className="events-list-avatar rounded-circle" alt="" />
      </ListGroupItem>
    )
  }

  getNextOccurrence = (when) => {
    if (!when) return null
    if (when.repeat && when.recurring) {
      const { type, every, days, monthly } = when.recurring
      try {
        return findNextEvent(when.startingDate, type, every, days, monthly)
      } catch (e) {
        return new Date(when.startingDate)
      }
    }
    return new Date(when.startingDate)
  }
      
  handleItemClick = () => {
    this.props.onItemClick(this.props.item._id)
  }

  getFallbackInitial = (item) => {
    const name = item?.organiser?.name
    if (name && name !== '-') {
      return name.charAt(0).toUpperCase()
    }
    return 'A'
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  userLocation: PropTypes.any,
  avatarUrl: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
  showNextView: PropTypes.bool,
}

export default ListItem
