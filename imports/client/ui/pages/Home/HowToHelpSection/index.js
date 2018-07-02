import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import Item from './Item'
import i18n from '/imports/both/i18n/en'
import ContributorsSection from '../ContributorsSection'
import './styles.scss'

const HowToHelpI18N = i18n.Home.how_to_help_section

class HowToHelpSection extends Component {
  render (props) {
    const {
      title,
      content
    } = HowToHelpI18N

    const {
      items
    } = content

    return (
      <section id='how_to_help_section'>
        <Container>
          <Row className="items">
            <Col>
              <div className='title'>{title}</div>
              {items.map((item, i) => (
                <Row key={i}>
                  <Item item={item} />
                  {(i === 1) ? <Button className='sign-and-post' tag={Link} to='/?new=1'>Post</Button> : null}
                </Row>
              ))}
            </Col>
            <Col>
              <div><ContributorsSection /></div>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default HowToHelpSection
