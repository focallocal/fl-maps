import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import './styles.scss'

class Home extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Home')
  }

  render () {
    let url;
    let opacity;
    if (window.__mapType === 'gatherings'){
      url = "/images/focallocal-bg.jpg";
      opacity = .5;
    } else {
      url = '/images/btm-bg.jpeg';
    }
    let backgroundImage = {backgroundImage: 'url(' + url + ')',opacity};
    return (
      <main className='home'>
        <div id='hero-bg' style={backgroundImage} />
        <FirstSection />
        <SecondSection button/>
      </main>
    )
  }
}

export default Home
