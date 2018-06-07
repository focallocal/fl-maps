import React from 'react'
import { Container } from 'reactstrap'
import FindOrPost from './FindOrPost'
import './styles.scss'

const FirstSection = () => (
  <Container id='first-section' tag='section'>
    <FindOrPost />
  </Container>
)

export default FirstSection
