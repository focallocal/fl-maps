import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink,
  CardDeck
} from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import ContributorsSection from '../ContributorsSection'
import './styles.scss'

const ProjectsI18N = i18n.Home.projects_section
const { Home } = i18n

class ProjectsSection extends Component {
  render (props) {
    const {
      title,
      content,
      subtitle
    } = ProjectsI18N

    const {
      items
    } = content

    // const isLoggedIn = !!this.props.user
    const isLoggedIn = this.props.isLoggedIn
    const loginButton =
    <Button className='sign-and-post' tag={Link} to='/?new=1'>
      {isLoggedIn ? Home.post.button_loggedIn : Home.post.button}
    </Button>

    return (
      <section id='projects_section'>
        <Container>
          <div className='title'>
            {title}
            <div className='sub-title'>{subtitle}</div>
          </div>
          <Row className="items justify-content-center">
            {items.map((item, i) => (
              <Item item={item} loginButton={loginButton} />
            ))}
          </Row>
        </Container>
      </section>
    )
  }
}
ProjectsSection.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default ProjectsSection
