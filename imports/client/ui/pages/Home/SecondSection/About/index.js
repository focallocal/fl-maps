import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import SmileyLogo from './Logos/SmileyLogo/SmileyLogo'
import FriendsLogo from './Logos/FriendsLogo/FriendsLogo'
import ShareLogo from './Logos/ShareLogo/ShareLogo'
import './styles.scss'

const { Home } = i18n
class About extends Component {
  render () {
    return (
      <section id="about" className="content-section">
        <div>
          <h2>{Home.second_section.title}</h2>
          <div>
            <p>
              {Home.second_section.content.first}
            </p>
            <p>
              {Home.second_section.content.second}
            </p>
            <p>
              {Home.second_section.content.third}
            </p>
          </div>
          <div className="items">
            <SmileyLogo />
            <FriendsLogo />
            <ShareLogo />
          </div>
          <p>
            <span>{Home.second_section.content.fourth}</span>
          </p>
        </div>
      </section>
    )
  }
}

export default About
