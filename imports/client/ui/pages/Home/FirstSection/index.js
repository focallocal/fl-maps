import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container } from 'reactstrap'
import i18n from '/imports/both/i18n/en'
import Find from './Find'
import './styles.scss'

const { Home } = i18n
const FirstSection = ({ user }) => (
  <section id='first-section'>
    <Container>
      <div className='first-title'>{Home.first_title}</div>
      <Find user={user} />
    </Container>
  </section>
)

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(FirstSection)
