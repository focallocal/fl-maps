import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import i18n from '/imports/both/i18n/en/'
import './style.scss'

const { content } = i18n.Whitepaper.Intro.first_section
const {top_image_url} = content

const TopImageSection = () => (
  <section id='top-image-section'>
    <Container>
      <Row>
        <Col xs={12}>
          <img className='top_image' src={top_image_url}/>
        </Col>
      </Row>
    </Container>
  </section>
)

export default TopImageSection
