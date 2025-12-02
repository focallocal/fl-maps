import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events, { EventsSchema } from '/imports/both/collections/events'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Events.deleteEvent'
const newEvent = new ValidatedMethod({
  name,
  mixins: [],
  validate: ({ _id }) => {
    if (typeof _id !== 'string') {
      throw new Meteor.Error('Invalid event ID')
    }
  },
  run (model) {
    const userId = this.userId

    if (!userId) {
      throw new Meteor.Error('not logged in')
    }

    const modelId = String(model._id) // ensure it's a string

    Events.remove({ _id: modelId }, (err) => {
      if (err) {
        throw new Meteor.Error('Events.deleteEvent', err)
      }
    })
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 2, 5000, ({ allowed }, { userId, clientAddress }) => { // 2 requests every 5 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
