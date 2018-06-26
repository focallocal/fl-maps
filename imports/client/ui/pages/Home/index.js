import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import './styles.scss'

class Home extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Home')
  }

  render () {
    return (
      <main className='home'>
        <div id='hero-bg' />
        <FirstSection />
        <SecondSection button = {true}/>
      </main>
    )
  }
}

export default Home
