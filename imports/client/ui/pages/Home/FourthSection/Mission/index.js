import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class Mission extends Component {
  render () {
    return (
      <section id="mission" className="content-section">
        <h2>{Home.fourth_section.title}</h2>
        <div className="container">
          <div className="text-content">
            <p>{Home.fourth_section.content.second}</p>
            <p>{Home.fourth_section.content.third}</p>
            <p>{Home.fourth_section.content.fourth}</p>
            <p>{Home.fourth_section.content.fifth}</p>
          </div>
          <div className="text-video">
            <iframe src="https://www.youtube.com/embed/WUppGn2Z4b4?list=PLzwMXFvS_OYMIrrdyP1ASjmD3uz9NqC9p" frameBorder="0" allowFullScreen></iframe>
            <p>{Home.fourth_section.content.first}</p>
          </div>
        </div>
      </section>
    )
  }
}

export default Mission
