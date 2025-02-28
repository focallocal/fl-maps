import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import i18n from '/imports/both/i18n/en/'
import './style.scss'

const { title, content } = i18n.Whitepaper.Intro.third_section
const {
  first,
  second,
  third,
  fourth,
  youtubeLink
} = content

const ThirdSection = () => (
  <section className='third-section'>
    <Container>
      <Row>
        <Col md={6}>
          <h2 className='title'>{title}</h2>
          <div className="text-content">
            <p>{first}</p>
            <p>{second}</p>
            <p>{third}</p>
            {fourth && <p>{fourth}</p>}
          </div>
        </Col>
        <Col md={6} className='attachment-content'>
          <iframe src="https://www.youtube.com/embed/mFE9pztP9no" frameBorder="0" allowFullScreen></iframe>
        </Col>
      </Row>
    </Container>
  </section>
)

export default ThirdSection 