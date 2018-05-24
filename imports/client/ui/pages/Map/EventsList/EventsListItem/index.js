import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'
import { formatCategories } from '/imports/client/utils/format'
import haversine from 'haversine'
import './styles.scss'

class ListItem extends Component {
  render () {
    const {
      item,
      userLocation
    } = this.props

    const {
      name,
      categories,
      address
    } = item

    return (
      <ListGroupItem className='event-list-item'>
        <div className='name'>{name}</div>
        <div className='categories'>{formatCategories(categories)}</div>
        <div className='distance'>{this.calculateDistance(userLocation, address)}</div>
        <i className='fas fa-chevron-circle-right go-to' onClick={this.handleItemClick} />
      </ListGroupItem>
    )
  }

  handleItemClick = e => {
    const {
      _id,
      address: {
        location: {
          coordinates
        }
      }
    } = this.props.item

    const latLng = {
      lng: coordinates[0],
      lat: coordinates[1]
    }

    this.props.onItemClick(e, _id, latLng)
  }

  calculateDistance (userLocation, { location: { coordinates } }) {
    if (!userLocation) {
      return 'couldn\'t calculate distance to location'
    }

    const userPosition = { latitude: userLocation.lat, longitude: userLocation.lng }
    const addressPosition = { longitude: coordinates[0], latitude: coordinates[1] }

    const distance = haversine(userPosition, addressPosition, { unit: 'miles' }).toFixed(1)

    return distance + ' miles away'
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  userLocation: PropTypes.any,
  onItemClick: PropTypes.func.isRequired
}

export default ListItem
