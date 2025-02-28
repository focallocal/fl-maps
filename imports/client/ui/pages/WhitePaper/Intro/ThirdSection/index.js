import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import i18n from '/imports/both/i18n/en/'
import './style.scss'

const { title, content } = i18n.Whitepaper.Intro.third_section
const {
  first,
  second,
  third,
  fourth,
  youtubeLink,
  cta
} = content

const ThirdSection = () => (
  <section className='third-section' style={{padding: '0 0 60px 0', marginTop: '10px', marginBottom: '0'}}>
    <Container>
      <Row>
        <Col md={6}>
          <h2 className='title' style={{marginTop: '0', marginBottom: '8px'}}>{title}</h2>
          <div className="text-content">
            <p>{first}</p>
            <p>{second}</p>
            <p>{fourth}</p>
          </div>
        </Col>
        <Col md={6} className='attachment-content'>
          <iframe src={youtubeLink} frameBorder="0" allowFullScreen></iframe>
          <p className="quote">{third}</p>
        </Col>
      </Row>
      {cta && (
        <Row>
          <Col className="cta-wrapper">
            <p>{cta.text}</p>
            <Button color="primary" tag="a" href={cta.link}>{cta.button}</Button>
          </Col>
        </Row>
      )}
    </Container>
  </section>
)

export default ThirdSection 