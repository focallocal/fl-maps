import React, { Component } from 'react'
import TopImageSection from './TopImageSection'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import AboutSection from '../Home/SecondSection'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

class About extends Component {
  constructor(props) {
    super()
    this.state = {
      data: window.cachedDataForPage,
      id: props.match.params.id,
      loaded: false,
      badges: null
    }
  }


  componentDidMount () {
    window.__setDocumentTitle('About')
  }

  render () {

    return (
      <div id='about'>
        <h2>About Us</h2>
        {this.dcsHeading(i18n.Map.eventInfo.wall.title, i18n.Map.eventInfo.wall.subtitle, 'wal')}
        <div className='header-divider' />
        <TopImageSection />
        <AboutSection button= {false} />
        <FirstSection />
        <SecondSection />
      </div>
    )
  }

  // DOCUSS
  dcsHeading(title, subtitle, balloonId) {
    const badgeCount = (this.state.badges && this.state.badges[balloonId]) || 0
    const badgeHtml = (
      <span
        className="dcs-badge"
        title={`This section has ${badgeCount} topic(s)`}
      >
        {badgeCount}
      </span>
    )
    const titleClass =
      balloonId === this.state.selBalloonId ? 'dcs-selected' : ''
    return (
      <div
        style={{ margin: '20px 0', cursor: 'pointer' }}
        onClick={e => this.dcsClick(balloonId, e)}
      >
        <b className={titleClass}>{title}</b>&nbsp;

        <span className="dcs-icons">
          <img src={`/images/dcs-balloon-${balloonId}.png`} />
        </span>
        {badgeCount ? badgeHtml : ''}
        <div>
          <small style={{ marginLeft: '5px', marginRight: '5px', fontSize: '60%' }}>
            {subtitle}
          </small>
        </div>
      </div>
    )
  }

  dcsClick(balloonId, e) {
    this.props.dcsClick(balloonId)
    e.stopPropagation() // Required for deselection
  }

}

export default About