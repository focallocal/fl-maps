import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroupItem } from 'reactstrap'
import { formatMilesFromLocation, formatCategories } from '/imports/client/utils/format'
import * as Gravatar from '/imports/client/utils/Gravatar'
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

    let gravatar = ''

    const isSpecialCategorySelected = categories.some(e => {
      return e.name === 'Community Offer' || e.name === 'Meet me for Action!'
    })

    if(isSpecialCategorySelected) {
      gravatar = Gravatar.getGravatar(item.organiser.name, 60)
    }

    return (
      <ListGroupItem className='event-list-item'>
        {isSpecialCategorySelected ? <img src={gravatar} class="rounded-circle float-left mr-2" alt=""/> : ''}
        <div>
         <div className='name'>{name}</div>
         <div className='categories'>{formatCategories(categories)}</div>
         <div className='distance'>{formatMilesFromLocation(userLocation, address.location.coordinates)}</div>
        </div>
        <i className='fas fa-chevron-circle-right go-to' onClick={this.handleItemClick} />
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
  onItemClick: PropTypes.func.isRequired
}

export default ListItem
