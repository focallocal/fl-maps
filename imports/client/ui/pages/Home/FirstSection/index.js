import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container } from 'reactstrap'
import i18n from '/imports/both/i18n/en'
import Find from './Find'
import './styles.scss'

const { Home } = i18n

let title = (window.__mapType === 'gatherings') ? 'first-title-gatherings' : 'first-title-btm'
const FirstSection = ({ user }) => (

  <section id='first-section'>
    <Container>
      <div className={`first-title ${title}`}
      >{Home.first_title}</div>
      <Find user={user} />
    </Container>
  </section>
)

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(FirstSection)
