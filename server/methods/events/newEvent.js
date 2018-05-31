import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { logUserId, logUserIp } from '/server/security/rate-limiter'
import Events, { EventsSchema } from '/imports/both/collections/events'

const name = 'Events.newEvent'

const newEvent = new ValidatedMethod({
  name,
  mixins: [],
  validate: EventsSchema.validator(),
  run (event) {
    if (!Meteor.user()) {
      throw new Meteor.Error('Events.newEvent', 'Only users can perform this task')
    }

    return Events.insert(event, { validate: false, filter: false })
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method',
  userId (id) {
    logUserId(id)
    return true
  },
  clientAddress (ip) {
    logUserIp(ip)
    return true
  }
}, 1, 10000, () => { // prevent span, allow only 1 call every 10 seconds
  DDPRateLimiter.setErrorMessage(() => {
    return `Please wait at least a second between requests`
  })
})
