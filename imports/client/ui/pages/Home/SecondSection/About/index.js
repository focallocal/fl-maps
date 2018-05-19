import React, { Component, Fragment } from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class About extends Component {
    render () {
    return (
      <section id="about" className="content-section">
        <div className="container">
          <h2>What is Focallocal?</h2>
          <div>
            <p>
              Focallocal is an open, welcoming community of thousands of positive people around the world.
            </p>
            <p>
              Since 2011 we have been coming together and targeting the root causes of any, and all societal issues.
            </p>
            <p>
              Sharing ideas, and using fun activities to empower people to build a friendlier, happier more connected future for everyone.
            </p>
          </div>
          <div className="items">
            <div className="item">
              <div className="icon smiley" />
              <h4>make the world ‘happier’ every day</h4>
            </div>
            <div className="item">
              <div className="icon friends" />
              <h4>make ‘positive’ friends all over the world</h4>
            </div>
            <div className="item">
              <div className="icon share" />
              <h4>share or learn skills to </h4>
            </div>
          </div>
          <p>
            <span>Join us and turn Positive Action into a daily habit to explore your power to change the world, and the happiness it'll bring into your life</span>
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
