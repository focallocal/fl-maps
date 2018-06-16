import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

/*
  Mark/Unmark user as attendee of a certain event.
*/

const name = 'Events.attendEvent'
const attendEvent = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    id: {
      type: String,
      max: 36
    }
  }).validator(),
  run ({ id }) {
    const userId = this.userId

    if (!userId) {
      throw new Meteor.Error('please login to perform that action')
    }

    const event = Events.find({
      _id: id
    }).fetch()[0]

    if (!event) {
      throw new Meteor.Error('could not find anything...')
    }

    const {
      attendees,
      limit
    } = event.engagement

    // If user is already an attendee
    if (attendees.findIndex(u => u.id === userId) !== -1) {
      Events.update({
        _id: id
      }, {
        $pull: {
          'engagement.attendees': { id: userId }
        }
      })

      Meteor.users.update({
        _id: userId
      }, {
        $pull: {
          'attendance': { id: id }
        }
      })

      return 0
      // If user is not listed as an attendee
    } else if (limit === 0 || attendees.length < limit) {
      Events.update({
        _id: id
      }, {
        $addToSet: {
          'engagement.attendees': { id: userId, name: Meteor.user().profile.name }
        }
      })

      Meteor.users.update({
        _id: userId
      }, {
        $addToSet: {
          'attendance': {
            id: id,
            name: event.name,
            address: event.address,
            when: event.when
          }
        }
      })

      return 1
    } else {
      throw new Meteor.Error('limit')
    }
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 3, 10000, ({ allowed }, { userId, clientAddress }) => { // 3 requests every 10000 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
