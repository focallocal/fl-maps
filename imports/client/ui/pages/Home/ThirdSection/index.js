import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Adventures from './Adventures'
import './styles.scss'

const SecondSection = () => (
  <section id='second-section'>
    <Container>
      <Row>
        <Col>
          <Adventures />
        </Col>
      </Row>
    </Container>
  </section>
)

export default SecondSection
