import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Mission from './Mission'
import './styles.scss'

const FourthSection = () => (
  <section id='fourth-section'>
    <Container>
      <Row>
        <Col>
          <Mission />
        </Col>
      </Row>
    </Container>
  </section>
)

export default FourthSection
