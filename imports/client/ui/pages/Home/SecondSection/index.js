import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import About from './About'
import './styles.scss'

const SecondSection = () => (
  <section id='first-section'>
    <Container>
      <Row>
        <Col>
          <About />
        </Col>
      </Row>
    </Container>
  </section>
)

export default SecondSection
