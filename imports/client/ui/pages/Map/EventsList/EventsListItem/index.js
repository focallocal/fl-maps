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
      userGravatar,
      ishovered,
    } = this.props

    const {
      name,
      categories,
      address
    } = item

    const listItemClass = `event-list-item clickable-list-item ${
      ishovered ? "highlighted" : ""
    }`;

    return (
      <ListGroupItem 
        id ={`event-${item._id}`}
        className={listItemClass}
        onClick={this.handleItemClick}
      >
        <img src={userGravatar} className="rounded-circle float-left mr-2" alt=""/>
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
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  userLocation: PropTypes.any,
  onItemClick: PropTypes.func.isRequired,
}

export default ListItem
