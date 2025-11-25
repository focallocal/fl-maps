// External Packages
import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
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
import { getDiscourseAvatarUrl, buildAvatarUrl, getDiscourseOrigin } from '/imports/client/utils/discourseAvatar'

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
      editDeletePermission: false,
      gravatarUrl: null,
      organiserUsername: null,
      discourseTopic: null,
      showDeleteModal: false
    }
    this._isMounted = false
    this.pendingAvatarUsername = null
  }

  componentDidMount () {
    this._isMounted = true
    // Listen for postMessage from Discourse parent window
    this.messageListener = (event) => {
      // Only accept messages from parent window
      if (event.source === window.parent && event.data && event.data.type === 'dcsRoute') {
        console.log('📨 Received dcsRoute message:', event.data)
        if (event.data.topic) {
          this.setState({ discourseTopic: event.data.topic }, () => {
            // Re-fetch organiser data with new discourse topic info
            if (this.state.data && this.state.data.organiser) {
              this.fetchOrganiserData(this.state.data.organiser)
            }
          })
        }
      }
    }
    window.addEventListener('message', this.messageListener)

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
      this.fetchOrganiserData(data.organiser)
    }
    this.deleteEditPermission()
  }

  componentWillUnmount () {
    // Clean up message listener
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener)
    }
    this._isMounted = false
    this.pendingAvatarUsername = null
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.data && !prevState.data) {
      window.__setDocumentTitle(this.state.data.name)
      // Fetch organiser data when data becomes available
      this.fetchOrganiserData(this.state.data.organiser)
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
      editDeletePermission,
      gravatarUrl,
      organiserUsername
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
    let isAuthor = false

    if (isLoggedIn && organiser && organiser._id) {
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
        <Row className='page-action-buttons'>
          <Col xs={6}>
            <Button color='danger' onClick={this.closePage}>Back To Map</Button>
          </Col>
          <Col xs={6} className='text-right'>
            <div className='going-invite-buttons'>
              <DCSLink className='docuss-link going-btn' badge="true" format="text-link" title="I'm Going" triggerId="going" composerTemplate="going" />
              <DCSLink className='docuss-link invite-btn' badge="true" format="text-link" title="Invite" triggerId="invite" composerTemplate="invite" />
            </div>
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
                <DCSLink className='docuss-link wall-btn' badge="true" format="text-link" title={i18n.Map.eventInfo.wall.title} triggerId="wall" composerTemplate="wall" />
                {' '}
                <DCSLink className='docuss-link media-btn' badge="true" format="text-link" title={i18n.Map.eventInfo.media.title} triggerId="media" composerTemplate="media" />
                {' '}
                <DCSLink className='docuss-link stories-btn' badge="true" format="text-link" title={i18n.Map.eventInfo.stories.title} triggerId="stories" composerTemplate="stories" />
              </div>
            </Col>

            <Col xs={4} className='right'>
              {organiser && organiser._id && organiser._id !== '-' && organiserUsername && (
                <div className='creator-info' data-version="v3-username-only">
                  <SectionTitle title='Created By' />
                  <div className='creator-details'>
                    <a 
                      href={`https://publichappinessmovement.com/u/${organiserUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='creator-link'
                    >
                      {gravatarUrl ? (
                        <img 
                          src={gravatarUrl} 
                          alt={organiser.name || 'User avatar'} 
                          className='creator-avatar'
                        />
                      ) : (
                        <div className='creator-avatar-placeholder'>
                          {(organiser.name && organiser.name !== '-' ? organiser.name[0] : 'A').toUpperCase()}
                        </div>
                      )}
                      <span className='creator-name'>
                        {organiser.name && organiser.name !== '-' ? organiser.name : 'Anonymous'}
                      </span>
                    </a>
                  </div>
                </div>
              )}
              {organiser && organiser._id && organiser._id !== '-' && organiserUsername && <Divider />}
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
              <div className='event-actions'>
                {isAuthor && (
                  <Button
                    className='delete-btn'
                    onClick={this.toggleDeleteModal}
                  >
                    <i className='fas fa-trash-alt mr-2' aria-hidden='true' />
                    Delete
                  </Button>
                )}
                {data && (
                  <Button
                    className='report-btn'
                    onClick={this.handleReportClick}
                  >
                    <i className='fas fa-flag mr-2' aria-hidden='true' />
                    Report
                  </Button>
                )}
              </div>
            </Col>

          </Row>
          <iframe
            className='embedded-map'
            frameBorder='0'
            allowFullScreen
            src={mapUrl}
          />
        </Container>

        <Modal isOpen={this.state.showDeleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>Delete Event</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this event? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggleDeleteModal}>
              No, Cancel
            </Button>
            <Button color='danger' onClick={this.handleDeleteEvent}>
              Yes, Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  closePage = () => {
    const { data } = this.state
  const globalWindow = /** @type {any} */ (window)

    const previousMapState = globalWindow.previousStateOfMap || {}
    const coordinates = data?.address?.location?.coordinates
    let center = previousMapState.center
    let zoom = previousMapState.zoom || 12

    if (Array.isArray(coordinates) && coordinates.length === 2) {
      const [lng, lat] = coordinates
      if (typeof lat === 'number' && typeof lng === 'number') {
        center = { lat, lng }
        zoom = 12
      }
    }

    if (center) {
      globalWindow.__savedUserLocation = center
    }

    globalWindow.previousStateOfMap = {
      ...previousMapState,
      center: center || previousMapState.center,
      zoom,
      userLocation: center || previousMapState.userLocation || previousMapState.center,
      currentEvent: null,
      showFilters: false,
      filteredEvents: null
    }

    this.setState({ redirect: true })
  }

  deleteEditPermission = () => {
    checkPermissions('deleteEditResource').then(response => {
      this.setState({ editDeletePermission: response })
    })
  }

  toggleDeleteModal = () => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal })
  }

  handleDeleteEvent = () => {
    const { data } = this.state
    
    if (!data || !data._id) {
      alert('Event details are still loading. Please try again.')
      return
    }

    Meteor.call('Events.deleteEvent', data, (err, res) => {
      if (!err) {
        this.setState({ 
          showDeleteModal: false,
          redirect: true 
        })
      } else {
        alert('Failed to delete event. Please try again.')
        console.error('Delete event error:', err)
      }
    })
  }

  handleReportClick = () => {
    const { data } = this.state

    if (!data || !data._id) {
      alert('Event details are still loading. Please try again in a moment.')
      return
    }

    const pageName = data.docussPageName || `m_${data._id}`
    const eventName = data.name?.trim() || 'this event'
    const isInIframe = window.self !== window.top

    const discourseOriginRaw = getDiscourseOrigin()
    const fallbackOrigin = typeof window !== 'undefined' ? window.location.origin : null
    const discourseOrigin = (discourseOriginRaw || fallbackOrigin) ? (discourseOriginRaw || fallbackOrigin).replace(/\/$/, '') : null
    const docussLink = discourseOrigin ? `${discourseOrigin}/docuss/${pageName}` : null
    const eventUrl = typeof window !== 'undefined' && window.location ? window.location.href : ''
    const siteOrigin = typeof window !== 'undefined' && window.location ? window.location.origin : ''
    const canonicalEventUrl = siteOrigin && data?._id
      ? `${siteOrigin.replace(/\/$/, '')}/page/${data._id}`
      : null
    const shareUrl = data?.shareUrl || data?.congratsShareUrl
    const resolvedShareUrl = shareUrl || docussLink || canonicalEventUrl || eventUrl || 'Not available'

    const recipients = 'moderators'
    const subject = `Report: ${eventName}`
    const bodySections = [
      `Event: ${eventName}`,
    `Event URL: ${resolvedShareUrl}`,
      docussLink ? `Docuss discussion: ${docussLink}` : null,
      '',
      'Please describe your concern below:'
    ].filter(Boolean)
    const messageBody = bodySections.join('\n')

    if (isInIframe) {
      try {
        window.parent.postMessage({
          type: 'composeMessage',
          recipients,
          subject,
          body: messageBody,
          draftKey: `docuss-report-${data._id}-${Date.now()}`,
          pageName,
          eventId: data._id
        }, '*')
      } catch (error) {
        console.warn('[Page] Failed to request moderator message composer', error)
      }
    } else if (discourseOrigin) {
      const query = new URLSearchParams({
        username: recipients,
        title: subject,
        body: messageBody
      })
      window.open(`${discourseOrigin}/new-message?${query.toString()}`, '_blank', 'noopener')
    } else {
      alert('We could not reach the forum messaging system. Please contact the moderators directly.')
    }
  }

  scrollToMap () {
    scrollToElement('.embedded-map')
  }

  getEventData = () => {
    Meteor.call('Events.getEvent', { id: this.state.id }, (err, res) => {
      if (!err) {
        if (res && res._id) {
          this.setState({ data: res, loaded: true })
          this.fetchOrganiserData(res.organiser)
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

  fetchOrganiserData = (organiser) => {
    if (!organiser || !organiser._id) {
      console.warn('❌ No organiser data')
      return
    }

    const { discourseTopic } = this.state

    // Priority 1: use data coming from Discourse topic (when viewing the Discourse thread directly)
    if (discourseTopic && discourseTopic.avatarTemplate) {
      this.pendingAvatarUsername = null
      const fullAvatarUrl = buildAvatarUrl(discourseTopic.avatarTemplate, 50)
      if (this._isMounted) {
        this.setState({
          gravatarUrl: fullAvatarUrl,
          organiserUsername: discourseTopic.username || organiser.username || null
        })
      }
      return
    }

    // Priority 2: lookup via organiser.username by querying Discourse
    if (organiser.username) {
      const username = organiser.username
      this.pendingAvatarUsername = username

      if (this._isMounted) {
        this.setState({
          organiserUsername: username,
          gravatarUrl: null
        })
      }

      getDiscourseAvatarUrl(username, 50)
        .then(url => {
          if (!this._isMounted) {
            return
          }
          if (this.pendingAvatarUsername !== username) {
            return
          }
          this.setState({ gravatarUrl: url || null })
        })
        .catch(error => {
          console.warn('❌ Failed to fetch Discourse avatar for organiser', username, error)
        })
      return
    }

    console.warn('❌ No avatar data available for organiser', organiser)
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

  const previousState = window['previousStateOfMap']
  if (!previousState || !Array.isArray(previousState.events)) {
    return
  }

  const entryIndex = previousState.events.findIndex(e => e._id === updatedEntry._id)
  if (entryIndex === -1) {
    return
  }

  previousState.events[entryIndex] = updatedEntry
}

Page.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  }
})(withRouter(Page))

// Testing
export { Page }
