import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class SmileyLogo extends Component {
  render () {
    return (
      <div className="item">
        <div className="icon smiley" />
        <h4>{Home.second_section.content.items.smiley}</h4>
      </div>
    )
  }
}

export default SmileyLogo
