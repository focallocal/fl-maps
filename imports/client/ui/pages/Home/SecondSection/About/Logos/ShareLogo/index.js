import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class ShareLogo extends Component {
  render () {
    return (
      <div className="item">
        <div className="icon share" />
        <h4>{Home.second_section.content.items.share}</h4>
      </div>
    )
  }
}

export default ShareLogo
