import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
// import ThirdSection from './ThirdSection'
// import FourthSection from './FourthSection'
// import FifthSection from './FifthSection'
import './styles.scss'

class Home extends Component {
  render () {
    return (
      <main>
        <FirstSection />

        <div className='section-divider' />

        <SecondSection />
        {/* <ThirdSection />
        <FourthSection />
        <FifthSection /> */}
      </main>
    )
  }
}

export default Home
