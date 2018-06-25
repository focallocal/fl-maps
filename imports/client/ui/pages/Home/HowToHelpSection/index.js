import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const HowToHelpI18N = i18n.Home.how_to_help_section

const {
  title,
  content
} = HowToHelpI18N

const {
  items
} = content

const HowToHelpSection = () => (
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
    <Button className='sign-and-post' tag={Link} to='/sign-in'>Sign In and Post</Button>
  </section>
)

export default HowToHelpSection
