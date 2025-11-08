// External Packages
import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { withDcs } from 'dcs-react-router-sync'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container, Row, Col, Button } from 'reactstrap'
import Linkify from 'linkifyjs/react'

// Components
import HoursFormatted from '/imports/client/ui/components/HoursFormatted'
import VideoPlayer from '/imports/client/ui/components/VideoPlayer'
import PageLoader from '/imports/client/ui/components/PageLoader'
import SharePanel from '/imports/client/ui/components/SharePanel'
import EditPage from './Edit'
import DCSLink from '/imports/client/ui/components/DCSLink'

// Helpers
import { formatCategories } from '/imports/client/utils/format'
import { scrollToElement } from '/imports/client/utils/DOMInteractions'
import { checkPermissions } from './../Admin/RolesPermissions/index'

// Styles and Other
import './style.scss'
import i18n from '/imports/both/i18n/en'

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: window.cachedDataForPage,
      id: props.match.params.id,
      loaded: false,
      badges: null,
      redirect: false,
      editDeletePermission: false
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
    this.deleteEditPermission()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.data && !prevState.data) {
      window.__setDocumentTitle(this.state.data.name)
    }
  }

  static getDerivedStateFromProps (prevState) {
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

  render () {
    if (this.state.redirect === true) {
      return <Redirect to='/map' />
    }

    const {
      data,
      loaded,
      editDeletePermission
    } = this.state

    if (!loaded) {
      return <PageLoader className='pages' />
    }

    if (!data || !data.address) {
      console.warn('Invalid event data, redirecting to map')
      return <Redirect to='/map' />
    }

    const {
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
    if (isLoggedIn && editDeletePermission) {
      isAuthor = editDeletePermission
    }

    return (
      <div id='page' onClick={e => this.dcsClick(null, e)}>
        <div className='header'>
          <VideoPlayer
            categories={c}
            video={video}
          />

        </div>
        <Row>
          <Col xs={6} lg={{ size: 1, offset: 0 }}>
            <Button color='danger' onClick={this.closePage}>Back To Map</Button>
          </Col>
          <Col xs={6} lg={{ size: 1, offset: 11 }}>
            <Button color='primary'>
              <DCSLink className='whos-going-link' badge="false" format="text-link" title="Who's Going" triggerId="going" />
            </Button>
          </Col>
        </Row>

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
              <div className='description'>
                <SectionTitle title='About' />
                <Linkify options={linkifyOption}>{description}</Linkify>
              </div>
              <div className='share'>
                <SectionTitle title={i18n.Map.eventInfo.shareExpTitle} />
                <DCSLink className='share-btn' badge="true" format="text-link" title={i18n.Map.eventInfo.wall.title} triggerId="wall" />
                <DCSLink className='share-btn' badge="true" format="text-link" title={i18n.Map.eventInfo.media.title} triggerId="media" />
                <DCSLink className='share-btn' badge="true" format="text-link" title={i18n.Map.eventInfo.stories.title} triggerId="stories" />
              </div>
            </Col>

            <Col xs={4} className='right'>
              <SectionTitle title='Date and Time' />
              <HoursFormatted data={when}/>
              <Divider />
              <div className='location'>
                <SectionTitle title='Location' />
                <div>{address.name}</div>
                <a className='view-map' onClick={this.scrollToMap}>View Map</a>
              </div>
              <Divider />
              <div className='social'>
                <SectionTitle title={i18n.Map.eventInfo.socialMedia.title} />
                <p className='social__subheading'>{i18n.Map.eventInfo.socialMedia.subtitle}</p>
                <SharePanel data={when}/>
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
      </div>
    )
  }

  closePage = () => {
    this.setState({ redirect: true })
  }

  deleteEditPermission = () => {
    checkPermissions('deleteEditResource').then(response => {
      this.setState({ editDeletePermission: response })
    })
  }

  scrollToMap () {
    scrollToElement('.embedded-map')
  }

  getEventData = () => {
    Meteor.call('Events.getEvent', { id: this.state.id }, (err, res) => {
      if (!err) {
        if (res && res._id) {
          this.setState({ data: res, loaded: true })
        } else {
          // Event not found or invalid, redirect to map
          console.warn('Event not found:', this.state.id)
          this.setState({ redirect: true })
        }
      } else {
        console.error('Error loading event:', err)
        this.setState({ redirect: true })
      }
    })
  }

  dcsClick = (node, event) => {
    if (typeof this.props.dcsClick === 'function') {
      this.props.dcsClick(node, event)
    }
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

const PageWithDcs = withDcs(Page)

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(withRouter(PageWithDcs))

// Testing
export { Page }
