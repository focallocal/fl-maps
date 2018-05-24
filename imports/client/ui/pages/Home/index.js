import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import FourthSection from './FourthSection'
import FifthSection from './FifthSection'

class Home extends Component {
  render () {
    return (
      <main>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
      </main>
    )
  }
}

export default Home
