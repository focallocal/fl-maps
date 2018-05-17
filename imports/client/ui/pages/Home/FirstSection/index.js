import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import FindOrPost from './FindOrPost'
import './styles.scss'

const FirstSection = () => (
  <section id='first-section'>
    <Container>
      <Row>
        <Col>
          <img src='/images/logo.png' className='logo'/>
        </Col>

        <Col>
          <FindOrPost />
        </Col>
      </Row>
    </Container>
  </section>
)

export default FirstSection
