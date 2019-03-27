import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Events.getEvents'
const getEvents = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    skip: Number,
    limit: Number,
    location: {
      type: Object,
      optional: true
    },
    distance: Number,
    'location.lat': Number,
    'location.lng': Number,
    count: {
      type: Number,
      optional: true
    }
  }).validator(),
  run ({ skip, limit, location, distance = 100000 }) { // distance in meters, 100km
    const {
      lng,
      lat
    } = location

    const events = Events.find({
      'address.location': {
        $near: {
          $geometry: {
            type: 'Point', coordinates: [lng, lat]
          },
          $maxDistance: distance
        }
      }
    }, {
      skip,
      limit: 30
    })

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
