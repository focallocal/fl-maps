import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import i18n from '/imports/both/i18n/en'
import Find from './Find'
import './styles.scss'

const { Home, MainMenu } = i18n
let color
let titleColor = {color: color}

const FirstSection = ({ user }) => (
  <section id='first-section'>
    <Link
      to="?new=1"
      style={{position: 'absolute'}}
    >
      <Button>{MainMenu.addEvent}</Button>
    </Link>
    <Container>
      <div className='first-title' style={
        (window.__mapType === 'gatherings') ? titleColor = {color: 'rgba(0,0,0,.75)'} : titleColor = {color: '#ffffff'}}
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
