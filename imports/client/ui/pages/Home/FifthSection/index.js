import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import MoreLinks from './MoreLinks'
import './styles.scss'

const FifthSection = () => (
  <section id='fifth-section'>
    <Container>
      <Row>
        <Col>
          <MoreLinks />
        </Col>
      </Row>
    </Container>
  </section>
)

export default FifthSection
