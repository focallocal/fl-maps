import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import i18n from '/imports/both/i18n/en/whitepaper'
import '././styles.scss'

const { title, content } = i18n.Whitepaper.Intro.second_section
const {
  first,
  second,
  third,
  fourth,
  fifth,
  youtubeLink
} = content

const SecondSection = () => (
  <section className='second-section'>
    <Container>
      <Row>
        <Col xs={6}>
          <h2 className='title'>{title}</h2>
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

export default SecondSection
