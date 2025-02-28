import React from 'react'
import { Container } from 'reactstrap'
import i18n from '/imports/both/i18n/en/'
import './style.scss'

const { top_image_url } = i18n.Whitepaper.Intro

const TopImageSection = () => (
  <section className='top-image-section'>
    <Container>
      <div className="top-image-wrapper">
        <img src={top_image_url} alt="Public Happiness Movement Logo" />
      </div>
    </Container>
  </section>
)

export default TopImageSection
