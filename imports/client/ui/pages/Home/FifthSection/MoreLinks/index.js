import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class MoreLinks extends Component {
  render () {
    return (
      <section id="more-links" className="content-section">
        <div className="container">
          <h2>{Home.fifth_section.title}</h2>
          <p>{Home.fifth_section.content.first}</p>
        </div>
      </section>
    )
  }
}

export default MoreLinks
