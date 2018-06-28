import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const HowToHelpI18N = i18n.Home.how_to_help_section

class HowToHelpSection extends Component{
render(props){

const {
  title,
  content
} = HowToHelpI18N

const {
  items
} = content

const isLoggedIn = this.props.isLoggedIn;

  return(
  <section id='how_to_help_section'>
    <Container>
      <div className='title'>{title}</div>
      <Row className="items">
        {items.map((item, i) => (
          <Col key={i}>
            <Item item={item} />
          </Col>
        ))}
      </Row>
    </Container>
    {{isLoggedIn} ? <Button className='sign-and-post' tag={Link} to='/?new=1'>Post</Button> : <Button className='sign-and-post' tag={Link} to='/sign-in'>Post</Button>}
  </section>
    )
  }
}

HowToHelpSection.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default HowToHelpSection
