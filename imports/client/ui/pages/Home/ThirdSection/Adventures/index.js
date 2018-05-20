import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const { Home } = i18n
class Adventures extends Component {
  render () {
    return (
      <template name="adventures">
        <section id="adventures" className="content-section side-text">
          <div className="container">
            <h2>{Home.third_section.title}</h2>
            <div className="row">
              <div>
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/tG4l514O0t4" frameBorder="0" allowFullScreen></iframe>
              </div>
              <div className="text-cont">
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
      </template>
    )
  }
}

export default Adventures
