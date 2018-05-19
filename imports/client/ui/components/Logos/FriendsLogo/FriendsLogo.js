import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class FriendsLogo extends Component {
  render () {
    return (
      <div className="item">
        <div className="icon friends" />
        <h4>{Home.second_section.content.items.friends}</h4>
      </div>
    )
  }
}

export default FriendsLogo
