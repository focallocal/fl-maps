import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import HowToHelpSection from './HowToHelpSection'
import './styles.scss'

class Home extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Home')
  }

  render () {
    const {
      user
    } = this.props
    const isLoggedIn = !!user

    return (
      <main className='home'>
        <div id='hero-bg' />
        <FirstSection />
        <HowToHelpSection
          isLoggedIn={isLoggedIn}/>
        <SecondSection />
      </main>
    )
  }
}

export default Home
