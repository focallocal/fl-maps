import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events, { EventsSchema, bridge } from '/imports/both/collections/events/index'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Events.newEvent'
export const newEvent = new ValidatedMethod({
  name,
  mixins: [],
  validate(event) {
    return bridge.getValidator()(event)
  },
  run (event) {
    if (!Meteor.user()) {
      throw new Meteor.Error('Events.newEvent', 'Only users can perform this task')
    }

    return Events.insert(event, { validate: false, filter: false })
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 2, 10000, ({ allowed }, { userId, clientAddress }) => { // 2 requests every 10 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
