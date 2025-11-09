import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { formatCategories, formatWhenObject } from '/imports/client/utils/format'
import i18n from '/imports/both/i18n/en'
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
  state = {
    event: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!prevState.event) {
      return {
        event: { ...window.__recentEvent }
      }
    }
  }

  componentDidMount () {
    loadFacebook()
    // Cache the recent event data for the page component
    if (this.state.event) {
      window.cachedDataForPage = this.state.event
    }
  }

  componentDidCatch (error, info) {
    if (Meteor.isDevelopment) {
      console.log(error, info)
    }

    this.setState({ hasErrors: true })
  }

  handleDone = () => {
    const { event } = this.state
    if (!event || !event._id) return

    const isInIframe = window.self !== window.top
    
    if (isInIframe) {
      // Tell parent Discourse window to navigate to the docuss page
      const docussUrl = `/docuss/m_${event._id}`
      window.parent.postMessage({
        type: 'navigateTo',
        url: docussUrl
      }, '*')
    } else {
      // Standalone mode - navigate directly
      window.location.href = `/page/${event._id}`
    }
  }

  render () {
    const {
      event
    } = this.state

    if (!event) {
      return <Redirect to='/' />
    }

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
              const onClick = getFunctionByMapType(btn, event)

              return onClick && (
                <Button
                  key={index}
                  onClick={() => onClick(event)}
                  className={'social ' + btn.icon}
                />
              )
            })}
          </div>

          <SelectableText event={event} />
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

const SelectableText = ({ event }) => {
  return (
    <div id="selectable">
      <blockquote>
        <p>{event.name}</p>
        <p>{formatCategories(event.categories)}</p>
        <p>Description: {event.description}</p>
        <p>Address: {event.address.name}</p>
        <p>When: {formatWhenObject(event.when)}</p>
        <p>How to find us: {event.findHints}</p>
        <p>Link: <a href={getUrl(event._id)} target='__blank'>{getUrl(event._id)}</a></p>
      </blockquote>
    </div>
  )
}

function getFunctionByMapType (btn, event) {
  const isHomelessMap = window.__mapType === 'street-sleeper'

  switch (btn.type) {
  case 'facebook':
    return isHomelessMap ? shareFacebook : createEventFacebbok
  case 'twitter':
    return shareTwitter
  case 'google':
    return shareGooglePlus
  case 'couchsurfing':
    return isHomelessMap ? null : () => window.open('https://www.couchsurfing.com/events')
  case 'eventbrite':
    return isHomelessMap ? null : () => window.open('https://eventbrite.com/create')
  }
  return null
}

/* brightertomorrowmap */

function shareFacebook ({ _id, name, categories, description }) {
  const url = getUrl(_id)

  window.FB.ui({
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

function shareTwitter ({ _id, name }) {
  const url = getUrl(_id)
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

function shareGooglePlus ({ _id }) {
  const url = getUrl(_id)
  return window.open('https://plus.google.com/share?url=' + url, '', _getWindowOptions(350, 600))
}

/* gatherings */

function createEventFacebbok () {
  return window.open('https://www.facebook.com/groups/focallocal/events/')
}

// Url for sharing and navigation
function getUrl (_id) {
  // Check if we're running in an iframe (Docuss integration)
  const isInIframe = window.self !== window.top
  
  if (isInIframe) {
    // Navigate to the Discourse docuss page for this event
    // Format: /docuss/m_{eventId}
    return `/docuss/m_${_id}`
  }
  
  // For standalone mode, use the direct page URL
  return Meteor.absoluteUrl('page/' + _id)
}

// Popup window options
function _getWindowOptions (height = 300, width = 300) {
  const win = window
  var x = win.top.outerWidth / 2 + win.top.screenX - (width / 2)
  var y = win.top.outerHeight / 2 + win.top.screenY - (height / 2)

  return `width=${width}, height=${height}, top=${y}, left=${x}`
}

function loadFacebook () {
  if (!window.FB) {
    let ele = document.createElement('script')
    ele.setAttribute('id', 'facebook-jssdk')
    ele.src = '//connect.facebook.net/en_US/sdk.js'
    ele.async = true
    document.body.appendChild(ele)

    window.fbAsyncInit = function () {
      const { appId } = Meteor.settings.public.facebook
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.9'
      })
    }
  }
}

export default CongratsModal
