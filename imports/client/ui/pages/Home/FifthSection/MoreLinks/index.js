import React, { Component } from 'react'
import i18n from '/imports/both/i18n/en'
import Option from './Option'
import './styles.scss'

const { Home } = i18n
class MoreLinks extends Component {
  render () {
    return (
      <section id="more-links" className="content-section">
        <div className="container">
          <h2>{Home.fifth_section.title}</h2>
          <p>{Home.fifth_section.content.first}</p>
          <div className="options">
            <Option url="https://www.youtube.com/user/Focallocal" text={Home.fifth_section.content.options.first}/>
            <Option url="https://www.facebook.com/groups/focallocal/" text={Home.fifth_section.content.options.second}/>
            <Option url="https://the-positive-action-shop.myshopify.com/" text={Home.fifth_section.content.options.third}/>
          </div>
        </div>
      </section>
    )
  }
}

export default MoreLinks
