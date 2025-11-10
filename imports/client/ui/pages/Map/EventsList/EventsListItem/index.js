import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'
import { formatMilesFromLocation, formatCategories } from '/imports/client/utils/format'
import './styles.scss'

class ListItem extends Component {
  render () {

    const {
      item,
      userLocation,
      avatarUrl,
      ishovered,
    } = this.props

    const {
      name,
      categories,
      address
    } = item

    const fallbackInitial = this.getFallbackInitial(item)

    const listItemClass = `event-list-item clickable-list-item ${
      ishovered ? "highlighted" : ""
    }`;

    return (
      <ListGroupItem 
        id ={`event-${item._id}`}
        className={listItemClass}
        onClick={this.handleItemClick}
      >
        {avatarUrl ? (
          <img src={avatarUrl} className="events-list-avatar rounded-circle float-left mr-2" alt="" />
        ) : (
          <div className="events-list-avatar events-list-avatar--placeholder rounded-circle float-left mr-2">
            {fallbackInitial}
          </div>
        )}
        <div>
          <div className='name'>{name}</div>
          <div className='categories'>{formatCategories(categories)}</div>
          <div className='distance'>{formatMilesFromLocation(userLocation, address.location.coordinates)}</div>
        </div>
      </ListGroupItem>
    )
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
}

export default ListItem
