import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.getEvents'
const getEvents = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    ids: [String],
   
  }).validator(),
  run({ ids }) { 
 
    const events = Events.find(
      { "organiser._id": { "$in": ids } }, 
      { fields: { '_id': 1, "organiser._id": 1, 'name': 1, 'categories': 1 } }
    )
   
    return events.fetch()
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 5, 2000, ({ allowed }, { userId, clientAddress }) => { // 5 requests every 2 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})



//{ "_id" : { "$in" : [ObjectId("55880c251df42d0466919268"), ObjectId("55bf528e69b70ae79be35006")] } }