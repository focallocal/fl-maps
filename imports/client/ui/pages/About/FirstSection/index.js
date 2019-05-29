import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import i18n from '/imports/both/i18n/en'
import DCSBalloon from '/imports/client/ui/components/DCSBalloon/index.js'
import './styles.scss'

const { title, content } = i18n.About.first_section
const {
  first,
  second,
  third,
  fourth,
  fifth,
  youtubeLink
} = content

const FirstSection = () => (
  <section className='first-section'>
    <Container>
      <Row>
        <Col xs={6}>
          <h2 className='title'>
            <DCSBalloon title={title} triggerId="section1" />
          </h2>
          <div className="text-content">
            <p>{second}</p>
            <p>{third}</p>
            <p>{fourth}</p>
            <p>{fifth}</p>
          </div>
        </Col>
        <Col xs={6} className='attachment-content'>
          <iframe src={youtubeLink} frameBorder="0" allowFullScreen></iframe>
          <p>{first}</p>
        </Col>
      </Row>
    </Container>
  </section>
)

export default FirstSection
