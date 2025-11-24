import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { formatCategories, formatWhenObject } from '/imports/client/utils/format'
import i18n from '/imports/both/i18n/en'
import { routeMatcher } from '../../../app'
import { getDiscourseOrigin } from '/imports/client/utils/discourseAvatar'
import './styles.scss'

const socialButtons = [
  /* eslint-disable no-multi-spaces */
  { type: 'facebook',     icon: 'fab fa-facebook-f' },
  { type: 'twitter',      icon: 'fab fa-twitter' },
  { type: 'google',       icon: 'fab fa-google-plus-g' },
  { type: 'couchsurfing', icon: 'btn-couchsurfing' },
  { type: 'eventbrite',   icon: 'btn-eventbrite' }
]

class CongratsModal extends Component {
  pageNamePromise = null

  state = {
    event: null,
    docussPageName: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!prevState.event && window['__recentEvent']) {
      const recentEvent = { ...window['__recentEvent'] }
      return {
        event: recentEvent,
        docussPageName: recentEvent.docussPageName || null
      }
    }

    return null
  }

  componentDidMount () {
    loadFacebook()
    this.updateCachedEvent()
    this.ensureDocussPageName()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.event !== prevState.event || this.state.docussPageName !== prevState.docussPageName) {
      this.updateCachedEvent()
    }
  }

  componentDidCatch (error, info) {
    if (Meteor.isDevelopment) {
      console.log(error, info)
    }

    this.setState({ hasErrors: true })
  }

  updateCachedEvent = () => {
    const { event, docussPageName } = this.state
    if (!event) {
      return
    }

    const discourseOrigin = getDiscourseOrigin()
    const shareUrl = docussPageName
      ? `${discourseOrigin}/docuss/${docussPageName}`
      : Meteor.absoluteUrl('page/' + event._id)

    const cached = docussPageName
      ? { ...event, docussPageName, shareUrl }
      : { ...event, shareUrl }

    window['cachedDataForPage'] = cached
  }

  getResolvedPageName = () => {
    const { docussPageName, event } = this.state
    return docussPageName || event?.docussPageName || null
  }

  ensureDocussPageName = () => {
    const { event } = this.state
    if (!event || !event._id) {
      return Promise.resolve(null)
    }

    const existing = this.getResolvedPageName()
    if (existing) {
      return Promise.resolve(existing)
    }

    if (!this.pageNamePromise) {
      this.pageNamePromise = routeMatcher
        .getPageName('/page/' + event._id)
        .then(pageName => {
          if (pageName) {
            this.setState(prev => {
              const baseEvent = prev.event || event
              const updatedEvent = baseEvent ? { ...baseEvent, docussPageName: pageName } : baseEvent

              if (updatedEvent) {
                window['__recentEvent'] = { ...updatedEvent }
              }

              return {
                docussPageName: pageName,
                event: updatedEvent
              }
            })
          }
          return pageName
        })
        .catch(error => {
          console.warn('[CongratsModal] Failed to resolve Docuss page name', error)
          return null
        })
        .finally(() => {
          this.pageNamePromise = null
        })
    }

    return this.pageNamePromise
  }

  handleDone = () => {
    const { event } = this.state
    if (!event || !event._id) return

    const isInIframe = window.self !== window.top

    if (!isInIframe) {
      window.location.href = `/page/${event._id}`
      return
    }

    this.ensureDocussPageName().then(pageName => {
      const resolved = pageName || this.getResolvedPageName()
      const docussPath = resolved ? `/docuss/${resolved}` : `/docuss/m_${event._id}`

      console.log('🚀 Navigate after event creation:', {
        eventId: event._id,
        pageName,
        resolved,
        docussPath
      })

      window.parent.postMessage({
        type: 'navigateTo',
        url: docussPath,
        delay: 500 // Add 500ms delay to allow page to be created/rendered
      }, '*')
    })
  }

  render () {
    const {
      event
    } = this.state

    if (!event) {
      return <Redirect to='/' />
    }

    const docussPageName = this.getResolvedPageName()
    const discourseOrigin = getDiscourseOrigin()
    const shareUrl = docussPageName
      ? `${discourseOrigin}/docuss/${docussPageName}`
      : Meteor.absoluteUrl('page/' + event._id)

    const {
      first_sentence,
      second_sentence
    } = i18n.CongratsModal

    return (
      <Modal isOpen={true} size='lg' id='congrats-modal'>
        <ModalHeader tag={'div'}>
          <h4>Congratulations! We are one step closer to a happier and more connected world!</h4>
        </ModalHeader>

        <ModalBody>
          <div className='bold'>{first_sentence}</div>
          {second_sentence && <div className='bold'>{second_sentence}</div>}

          <div className='social-links'>
            {socialButtons.map((btn, index) => {
              const onClick = getFunctionByMapType(btn, event, shareUrl)

              return onClick && (
                <Button
                  key={index}
                  onClick={onClick}
                  className={'social ' + btn.icon}
                />
              )
            })}
          </div>

          <SelectableText event={event} shareUrl={shareUrl} />
        </ModalBody>

        <ModalFooter>
          <Button 
            onClick={this.handleDone}
          >
            Done
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const SelectableText = ({ event, shareUrl }) => {
  return (
    <div id="selectable">
      <blockquote>
        <p>{event.name}</p>
        <p>{formatCategories(event.categories)}</p>
        <p>Description: {event.description}</p>
        <p>Address: {event.address.name}</p>
        <p>When: {formatWhenObject(event.when)}</p>
        <p>How to find us: {event.findHints}</p>
        <p>Link: <a href={shareUrl} target='__blank' rel='noopener noreferrer'>{shareUrl}</a></p>
      </blockquote>
    </div>
  )
}

function getFunctionByMapType (btn, event, shareUrl) {
  const isHomelessMap = window['__mapType'] === 'street-sleeper'

  switch (btn.type) {
  case 'facebook':
    return isHomelessMap ? () => shareFacebook(event, shareUrl) : createEventFacebbok
  case 'twitter':
    return () => shareTwitter(event, shareUrl)
  case 'google':
    return () => shareGooglePlus(event, shareUrl)
  case 'couchsurfing':
    return isHomelessMap ? null : () => window.open('https://www.couchsurfing.com/events')
  case 'eventbrite':
    return isHomelessMap ? null : () => window.open('https://eventbrite.com/create')
  }
  return null
}

/* brightertomorrowmap */

function shareFacebook ({ _id, name, description }, shareUrl) {
  const url = shareUrl || Meteor.absoluteUrl('page/' + _id)

  const fb = window['FB']
  if (!fb || typeof fb.ui !== 'function') {
    return
  }

  fb.ui({
    method: 'share_open_graph',
    action_type: 'og.shares',
    action_properties: JSON.stringify({
      object: {
        'og:url': url,
        'og:title': name,
        'og:description': description,
        'og:image': 'https://focallocal.org/images/logo.png'
      }
    })
  })
}

function shareTwitter ({ _id, name }, shareUrl) {
  const url = shareUrl || Meteor.absoluteUrl('page/' + _id)
  const promoText =
`
I've just posted on the Brighter Tomorrow Map to support people who are homeless living near me in building a brighter future
For more info: ${url}

`

  // Construct twitter link
  const tweet = 'https://twitter.com/intent/tweet?' +
    '&text=' + encodeURIComponent(promoText) +
    '&hashtags=brightertomorrowmap,focallocal,transformhomelessness,communityconnection'

  // Open a new window
  return window.open(tweet, '', _getWindowOptions(253, 600))
}

function shareGooglePlus ({ _id }, shareUrl) {
  const url = shareUrl || Meteor.absoluteUrl('page/' + _id)
  return window.open('https://plus.google.com/share?url=' + url, '', _getWindowOptions(350, 600))
}

/* gatherings */

function createEventFacebbok () {
  return window.open('https://www.facebook.com/groups/focallocal/events/')
}

// Popup window options
function _getWindowOptions (height = 300, width = 300) {
  const win = window
  var x = win.top.outerWidth / 2 + win.top.screenX - (width / 2)
  var y = win.top.outerHeight / 2 + win.top.screenY - (height / 2)

  return `width=${width}, height=${height}, top=${y}, left=${x}`
}

function loadFacebook () {
  if (!window['FB']) {
    let ele = document.createElement('script')
    ele.setAttribute('id', 'facebook-jssdk')
    ele.src = '//connect.facebook.net/en_US/sdk.js'
    ele.async = true
    document.body.appendChild(ele)

    window['fbAsyncInit'] = function () {
      const { appId } = Meteor.settings.public.facebook
      window['FB'].init({
        appId: appId,
        xfbml: true,
        version: 'v2.9'
      })
    }
  }
}

export default CongratsModal
