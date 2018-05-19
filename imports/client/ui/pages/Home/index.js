import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'

class Home extends Component {
  render () {
    return (
      <main>
        <FirstSection />
        <SecondSection />
      </main>
    )
  }
}

export default Home
