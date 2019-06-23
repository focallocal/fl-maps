import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.deleteAllEvents'
const newEvent = new ValidatedMethod({
  name,
  mixins: [],
  validate: ({ eventIds}) => {
    if (typeof eventIds === 'undefined') {
      throw new Meteor.Error('undefined')
    }
  },
  run({ eventIds}) {
    const userId = this.userId

    if (!userId) {
      throw new Meteor.Error('not logged in')
    }

    Events.remove({ "_id": { $in: eventIds }  }, (err) => {
      if (err) {
        throw new Meteor.Error('Events.deleteAllEvents', err)
      }
    })
  }
})


DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 5, 5000, ({ allowed }, { userId, clientAddress }) => { 
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})