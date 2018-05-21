import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'

class Home extends Component {
  render () {
    return (
      <main>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </main>
    )
  }
}

export default Home
