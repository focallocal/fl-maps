import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container, Row, Col } from 'reactstrap'
import { formatCategories } from '/imports/client/utils/format'
import { scrollToElement } from '/imports/client/utils/DOMInteractions'
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import VideoPlayer from '/imports/client/ui/components/VideoPlayer'
import PageLoader from '/imports/client/ui/components/PageLoader'
import EditPage from './Edit'
// import AttendingButton from './AttendingButton'  <-- currently disabled
import './style.scss'
import {Helmet} from "react-helmet";
import qs from 'query-string'
import Linkify from 'linkifyjs/react'
import i18n from '/imports/both/i18n/en'

class Page extends Component {
  constructor (props) {
    super()
    this.state = {
      data: window.cachedDataForPage,
      id: props.match.params.id,
      loaded: false,
      badges: null
    }
  }

  componentDidMount () {
    // THIS IS WRONG: if you fetch data in componentDidMount(), then any route
    // change to the same component but with another id WON'T RELOAD THE DATA
    // AND WON'T RE-RENDER THE PAGE. See this bug:
    // https://github.com/focallocal/fl-maps/issues/742
    const { data } = this.state

    if (!data) {
      this.getEventData()
    } else {
      this.setState({ loaded: true })
      window.__setDocumentTitle(data.name)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data && !prevState.data) {
      window.__setDocumentTitle(this.state.data.name)
    }

    // DOCUSS
    // Update selBalloonId here, so that we catch url changes triggered
    // in other components
    const { b } = qs.parse(window.location.search)
    if (this.state.selBalloonId !== b) {
      this.setState({ selBalloonId: b })
    }

    // DOCUSS
    // Add badges (color circles with topic count)
    if (!this.state.badges && this.props.dcsTags) {
      const prefix = `dcs-${this.state.id.substring(0, 12).toLowerCase()}-`
      const badges = {}
      this.props.dcsTags.forEach(tag => {
        if (tag.id.startsWith(prefix)) {
          const balloonId = tag.id.substring(17)
          badges[balloonId] = tag.count
        }
      })
      this.setState({ badges })
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const updatedData = window.__updatedData

    if (updatedData) {
      delete window.__updatedData

      if (window.previousStateOfMap) {
        mutateCachedMapState(updatedData)
        window.__setDocumentTitle(updatedData.name)
      }

      return {
        data: updatedData
      }
    }

    return prevState
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
        <small style={{marginLeft: '5px', marginRight: '5px', fontSize: '60%'}}>
          {subtitle}
        </small>
        </div>
      </div>
    )
  }

  render() {
    const {
      data,
      loaded
    } = this.state

    if (!loaded) {
      return <PageLoader className='pages' />
    }

    const {
      _id,
      address,
      categories: c,
      overview,
      findHints,
      description,
      name,
      organiser,
      when,
      video
    } = data

    const {
      history,
      user
    } = this.props

    // set Linkify to replace URL strings with clickable link
    // needs text string to be wrapped in Linkify component
    const linkifyOption = {
      format: (value, type) => {
        if (type === 'url') return 'External Link'
      }
    }

    const categories = formatCategories(c)
    const { key } = Meteor.settings.public.gm
    const mapUrl = 'https://www.google.com/maps/embed/v1/place?key=' + key + '&q=' + address.name

    const isLoggedIn = !!user
    let isAuthor

    if (isLoggedIn) {
      isAuthor = user._id === organiser._id
    }

    return (
      <div id='page' onClick={e => this.dcsClick(null, e)}>
        <div className='header'>
          <VideoPlayer
            categories={c}
            video={video}
          />
        </div>

        <Container className='body'>
          <Row>
            <Col xs={7} className='left'>
              <div className='title-wrapper'>
                <div className='title'>{name}</div>
                <div className='sub-title-categories'>{categories}</div>
              </div>
              <div className='intro'>
                <SectionTitle title='Introduction' />
                <Linkify options={linkifyOption}>{overview}</Linkify>
              </div>
              <div className='meet-me'>
                <SectionTitle title='Meet Me Details' />
                <Linkify options={linkifyOption}>{findHints}</Linkify>
              </div>
              {this.dcsHeading(i18n.Map.eventInfo.photos.title, i18n.Map.eventInfo.photos.subtitle, 'pho')}
              {this.dcsHeading(i18n.Map.eventInfo.videos.title, i18n.Map.eventInfo.photos.subtitle, 'vid')}
              <div className='description'>
                <SectionTitle title='About' />
                <Linkify options={linkifyOption}>{description}</Linkify>
              </div>
              {this.dcsHeading(i18n.Map.eventInfo.wall.title, i18n.Map.eventInfo.wall.subtitle, 'wal')}
              {this.dcsHeading(i18n.Map.eventInfo.experiences.title, i18n.Map.eventInfo.experiences.subtitle, 'exp')}

            </Col>

            <Col xs={4} className='right'>
              <SectionTitle title='Date and Time' />
              {/* attending button currently inactive until able to work with both maps:
                <AttendingButton _id={_id} history={history} isLoggedIn={isLoggedIn} user={user} />*/}
              <HoursFormatted data={when} />

              <Divider />

              <div className='location'>
                <SectionTitle title='Location' />
                <div>{address.name}</div>
                <a className='view-map' onClick={this.scrollToMap}>View Map</a>
              </div>

              <Divider />
              {isAuthor && <EditPage data={data} history={history} />}
            </Col>
          </Row>
          <iframe
            className='embedded-map'
            frameBorder='0'
            allowFullScreen
            src={mapUrl}
          />
        </Container>
        <div id="coral_talk_stream"></div>
        <Helmet>
          {/* The embed web address will need updated depending on environment */}
          {/* Package.json port will need updated if you leave embed at 3000*/}
          <script src="https://talk.focallocal.org/static/embed.js" async onload="
            Coral.Talk.render(document.getElementById('coral_talk_stream'), {
              talk: 'https://talk.focallocal.org/'
            });
          "></script>
        </Helmet>
      </div>
    )
  }

  scrollToMap() {
    scrollToElement('.embedded-map')
  }

  getEventData = () => {
    Meteor.call('Events.getEvent', { id: this.state.id }, (err, res) => {
      if (!err) {
        this.setState({ data: res, loaded: true })
      }
    })
  }

  dcsClick(balloonId, e) {
    this.props.dcsClick(balloonId)
    e.stopPropagation() // Required for deselection
  }
}

const SectionTitle = ({ title }) => <div className='section-title'>{title}</div>
const Divider = () => <div className='divider' />

export function mutateCachedMapState (updatedEntry) {
  /*
    mutate the cached object so it is updated with changes made to the current viewd page.
  */

  const entryIndex = window.previousStateOfMap.events.findIndex(e => e._id === updatedEntry._id)
  window.previousStateOfMap.events[entryIndex] = updatedEntry
}

Page.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(Page)

// Testing
export { Page }
