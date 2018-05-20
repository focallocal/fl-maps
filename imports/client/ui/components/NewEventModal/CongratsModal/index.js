import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import { EventsSchema } from '/imports/both/collections/events'
import { formatCategories, formatDate } from '/imports/client/utils/format'
import './styles.scss'

const socialButtons = [
  { icon: 'fab fa-facebook-f', onClick: shareOnFacebookLink },
  { icon: 'fab fa-twitter', onClick: shareOnTwitterLink },
  { icon: 'fab fa-google-plus-g', onClick: shareOnGooglePlusLink }
]

class CongratsModal extends Component {
  render () {
    const {
      'new-event-id': eventId,
      'new-event-model': event_
    } = localStorage

    if (!event_) {
      return <Redirect to='/' />
    }

    const event = { ...EventsSchema.clean(JSON.parse(event_)), _id: eventId }
    const {
      name
    } = event

    console.log(event)

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
                  className={`btn ${btn.icon}`}
                />
              )
            })}
          </div>

          <SelectableText event={event} />
        </ModalBody>

        <ModalFooter>
          <Button tag={NavLink} to='/' onClick={this.removeLocalStorage}>Done</Button>
        </ModalFooter>
      </Modal>
    )
  }

  removeLocalStorage () {
    localStorage.removeItem('new-event-model')
    localStorage.removeitem('new-event-id')
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
        <p>When: {constructWhen(event.when)}</p>
        <p>How to find us: {event.findHints}</p>
        <p>Link: <a href={getUrl(event._id)} target='__blank'>{getUrl(event._id)}</a></p>
      </blockquote>
    </div>
  )
}


// Dates
function constructWhen (data) {
  /* Format the "when" section based on the date type */

  if (data.type === 'oneDay') {
    const { startingTime, endingTime, startingDate } = data.oneDay
    return `${formatDate(startingDate)} on ${startingTime} - ${endingTime}`
  }

  if (data.type === 'specificPeriod') {
    const { startingDate, endingDate, days } = data.specificPeriod
    return `every ${formatDaysAndHours(days)}, from ${formatDate(startingDate)} until ${formatDate(endingDate)}`
  }

  if (data.type === 'regularHours') {
    return `every ${formatDaysAndHours(data.specificPeriod.days)}`
  }

  if (data.type === 'recurring') {
    const { days, every, type, repeat, until, forever } = data.recurring

    if (forever) {
      return `every ${every} ${type} on ${getDaysNames(days)}`
    } else {
      return `every ${every} ${type} on ${getDaysNames(days)} for ${repeat} occasions (until ${formatDate(until)})`
    }
  }
}

function formatDaysAndHours (days) {
  return days.reduce((str, day, index) => {
    const last = !days[index + 1]
    const lastNext = !days[index + 2]

    return str += `
      ${last ? 'and ' : ''}
      ${day.day} (${day.startingTime} - ${day.endingTime})${(last || lastNext) ? '' : ', '}`
  }, '')
}

function getDaysNames (days) {
  let daysMapper = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }
  return days.reduce((str, day, index) => {
    return str += daysMapper[day] + (days[index + 1] ? '/' : '')
  }, '')
}

// Share Links
function getUrl (_id) {
  return Meteor.absoluteUrl('events/' + _id)
}

function shareOnFacebookLink ({ _id, name, categories, description }) {
  const prodFbApiKey = Meteor.settings.public.facebook.oauth_key
  const url = getUrl(_id)
  const categoriesString = categories.reduce((str, obj) => str += ` ${obj.name}`, '')

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
  const promoText = 'I\'ve just created new GatherUp!'

  return 'https://twitter.com/intent/tweet?url=' + url +
    '&text=' + encodeURIComponent(promoText) +
    encodeURIComponent(name) +
    '&hashtags=Focallocal'
}

function shareOnGooglePlusLink ({ _id }) {
  const url = getUrl(_id)

  return 'https://plus.google.com/share?url=' + url
}

export default CongratsModal
