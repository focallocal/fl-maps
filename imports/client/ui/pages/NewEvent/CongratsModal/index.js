import React, { Component, PureComponent } from 'react'
import { Meteor } from 'meteor/meteor'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import router from '/imports/client/utils/history'
import { EventsSchema } from '/imports/both/collections/events'
import { formatCategories, formatWhenObject } from '/imports/client/utils/format'
import './styles.scss'

const socialButtons = [
  { icon: 'fab fa-facebook-f', onClick: shareOnFacebookLink },
  { icon: 'fab fa-twitter', onClick: shareOnTwitterLink },
  { icon: 'fab fa-google-plus-g', onClick: shareOnGooglePlusLink }
]

class CongratsModal extends PureComponent {
  render () {
    const {
      'new-event-id': eventId,
      'new-event-model': event_
    } = localStorage

    if (!eventId || !event_) {
      return <Redirect to='/' />
    }

    // Using EventsSchema's clean function will automatically convert values to their type
    const event = { ...EventsSchema.clean(JSON.parse(event_)), _id: eventId }

    return (
      <Modal isOpen={true} size='lg' id='congrats-modal'>
        <ModalHeader tag={'div'}>
          <h2>Congratulations!</h2>
          <h4>We're one step closer to a happier and more connected World</h4>
        </ModalHeader>

        <ModalBody>
          <div className='bold'>We've made it super easy to share this and reach more people!</div>
          <div className='bold'>Simply click the buttons below and then copy/paste the info.</div>

          <div className='social-links'>
            {socialButtons.map((btn, index) => {
              const href = btn.onClick(event)

              return (
                <Button
                  key={index}
                  tag={'a'}
                  href={href}
                  target='__blank'
                  className={'btn ' + btn.icon}
                />
              )
            })}
          </div>

          <SelectableText event={event} />
        </ModalBody>

        <ModalFooter>
          <Button onClick={this.onDone}>Done</Button>
        </ModalFooter>
      </Modal>
    )
  }

  onDone () {
    router.push('/map')
    localStorage.removeItem('new-event-model')
    localStorage.removeItem('new-event-id')
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

// Share Links
function getUrl (_id) {
  return Meteor.absoluteUrl('events/' + _id)
}

function shareOnFacebookLink ({ _id, name, categories, description }) {
  const prodFbApiKey = Meteor.settings.public.facebook.oauth_key
  const url = getUrl(_id)
  const categoriesString = categories.reduce((str, obj) => str += ' ' + obj.name, '')

  return 'http://www.facebook.com/dialog/feed?app_id=' + prodFbApiKey +
    '&link=' + url +
    '&picture=http://focallocal.org/assets/images/focallocal-logo.png' +
    '&name=' + encodeURIComponent(name) +
    '&caption=' + encodeURIComponent(categoriesString) +
    '&description=' + encodeURIComponent(description) +
    '&redirect_uri=' + Meteor.absoluteUrl() +
    '&display=popup'
}

function shareOnTwitterLink ({ _id, name }) {
  const url = getUrl(_id)
  const promoText =
`
I've just created a new gathering called ${name}!
for more info visit: ${url}
`

  return 'https://twitter.com/intent/tweet?' +
    '&text=' + encodeURIComponent(promoText) +
    '&hashtags=Focallocal'
}

function shareOnGooglePlusLink ({ _id }) {
  const url = getUrl(_id)

  return 'https://plus.google.com/share?url=' + url
}

export default CongratsModal
