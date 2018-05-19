import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import i18n from '/imports/both/i18n/en'
import SmileyLogo from './Items/SmileyLogo'
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
            <div className="item">
              <div className="icon friends" />
              <h4>{Home.second_section.content.items.friends}</h4>
            </div>
            <div className="item">
              <div className="icon share" />
              <h4>{Home.second_section.content.items.share} </h4>
            </div>
          </div>
          <p>
            <span>{Home.second_section.content.fourth}</span>
          </p>
        </div>
      </section>
    )
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(About)
