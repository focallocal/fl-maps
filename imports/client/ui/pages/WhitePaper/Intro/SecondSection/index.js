import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import i18n from '/imports/both/i18n/en/'
import './style.scss'

const { title, content } = i18n.Whitepaper.Intro.second_section
const {
  first,
  second,
  third,
  fourth,
  youtubeLink
} = content

const SecondSection = () => (
  <section className='second-section' style={{padding: '0 0 10px 0', marginTop: '10px', marginBottom: '0'}}>
    <Container>
      <Row>
        <Col md={6} className='attachment-content'>
          <iframe src={youtubeLink} frameBorder="0" allowFullScreen></iframe>
        </Col>
        <Col md={6}>
          <h2 className='title' style={{marginTop: '0', marginBottom: '8px'}}>{title}</h2>
          <div className="text-content">
            <p>{first}</p>
            <p>{second}</p>
            <p>{third}</p>
            {fourth && <p>{fourth}</p>}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
)

export default SecondSection
