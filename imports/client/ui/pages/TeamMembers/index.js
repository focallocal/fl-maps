// External Packages
import React, { Fragment } from 'react'
import { Container } from 'reactstrap'

// Components
import Members from './Members'
import NavMenu from '../WhitePaper/NavMenu'

// Styles and Other
import './styles.scss'
import i18n from '/imports/both/i18n/en'

const TeamMembers = () => (
  <div id="team-members">
    <h2>Our Team</h2>
    <NavMenu />
    <Members />
  </div>
)

export default TeamMembers
