import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events, { EventsSchema } from '/imports/both/collections/events'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Events.deleteEvent'
const newEvent = new ValidatedMethod({
  name,
  mixins: [],
  validate: ({ _id, ...model }) => {

    try {
      EventsSchema.validate(model)
    } catch (ex) {
      throw new Meteor.Error(ex)
    }

    if (typeof _id !== 'string') {
      throw new Meteor.Error('?')
    }
  },
  run(model) {
    const userId = this.userId
 
    if (!userId) {
      throw new Meteor.Error('not logged in')
    }

    const modelId = String(model._id) // ensure it's a string

     Events.remove({ _id: modelId, 'organiser._id': userId }, (err) =>{
       if(err){
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