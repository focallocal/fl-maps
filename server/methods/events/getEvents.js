import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import { logUserId, logUserIp } from '/server/security/rate-limiter'
import SimpleSchema from 'simpl-schema'

const name = 'Events.getEvents'

const getEvent = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    skip: Number,
    limit: Number,
    location: {
      type: Object,
      optional: true
    },
    'location.lat': Number,
    'location.lng': Number,
    count: {
      type: Number,
      optional: true
    }
  }).validator(),
  run ({ skip, limit, location, distance = 100000 }) {
    const {
      lng,
      lat
    } = location

    const events = Events.find({
      'address.location': {
        $near: {
          $geometry: {
            type: 'Point', coordinates: [lng, lat] },
          $maxDistance: distance }
      }
    }, {
      skip,
      limit: 15
    })

    return events.fetch()
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method',
  userId (id) {
    logUserId(name, id)
    return true
  },
  clientAddress (ip) {
    logUserIp(name, ip)
    return true
  }
}, 2, 1000, function (matcher) {
  DDPRateLimiter.setErrorMessage(() => {
    return `Passed the rate limit`
  })
})
