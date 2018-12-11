import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Events.getEventId'
const getEventId = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    discourseTag: { type: String, max: 20 }
  }).validator(),
  run({ discourseTag }) {
    const eventIds = Events.find({}, { fields: { _id: 1 } }).map(e => e._id)
    const lowerCaseShorterId = discourseTag.substring(4, 16)
    return eventIds.find(id => 
      id.substring(0, 12).toLowerCase() === lowerCaseShorterId
    )
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 1, 1000, ({ allowed }, { userId, clientAddress }) => { // 1 request per second
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
