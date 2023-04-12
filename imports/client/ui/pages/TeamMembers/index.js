// External Packages
import React, { Fragment } from 'react'
import { Container } from 'reactstrap'

// Components
import Members from './Members'

// Styles and Other
import './styles.scss'
import i18n from '/imports/both/i18n/en'

const Index = () => (
  <React.Fragment>
    <Container className="team-menu">
      <h1>Meet the Team</h1>
      <p className="intro-paragraph">Find out more about the amazing people building this platform and movement</p>
      {Object.keys(i18n.Team).map(team => {
        return (
          <a href={`#${team}`} key={team} >
            {i18n.Team[team].title}
          </a>
        )
      })}
    </Container>

    <div className='header-divider' />

    {Object.keys(i18n.Team).map(team => {
      return (
        <Fragment key={team}>
          <Container id={team}>
            <h2>{i18n.Team[team].title}</h2>
          </Container>
          <Members team={team} />
        </Fragment>
      )
    })}
  </React.Fragment>
)

export default Index
