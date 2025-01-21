import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Row
} from 'reactstrap'
import Item from './Item'
import './styles.scss'
import i18n from '/imports/both/i18n/en'

const MovementI18N = i18n.Home.movement_section
const { Home } = i18n

class MovementSection extends Component {
  render (props) {
    const {
      title,
      content
    } = MovementI18N

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
      <section id='movement_section'>
        <Container>
          <div className='title'>{title}</div>
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
MovementSection.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default MovementSection
