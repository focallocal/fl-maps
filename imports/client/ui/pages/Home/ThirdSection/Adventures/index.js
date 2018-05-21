import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class Adventures extends Component {
  render () {
    return (
      <section id="adventures" className="content-section">
        <div>
          <h2>{Home.third_section.title}</h2>
          <div className="text-content">
            <iframe src="https://www.youtube.com/embed/tG4l514O0t4" frameBorder="0" allowFullScreen></iframe>
            <div>
              <p>
                {Home.third_section.content.first}
              </p>
              <p>
                {Home.third_section.content.second}
              </p>
              <p>
                {Home.third_section.content.third}
              </p>
              <p>
                {Home.third_section.content.fourth}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Adventures
