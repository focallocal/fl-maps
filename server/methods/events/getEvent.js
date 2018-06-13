import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Events.getEvent'
const getEvents = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    id: String
  }).validator(),
  run ({ id }) { // distance in meters, 100km
    const event = Events.find({
      _id: id
    }).fetch()[0]
    
    if (!event) {
      throw new Meteor.Error('could not find anything...')
    }

    return event
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
