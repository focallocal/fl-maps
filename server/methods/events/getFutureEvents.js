import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Events.getFutureEvents'
const getFutureEvents = new ValidatedMethod({
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
      },
      $or: [
        { 'when.endingDate': { $gte: new Date() } },
        { 'when.recurring.forever': { $eq: true } },
        { 'when.multipleDays': { $eq: true } },
        { $and: [
          { 'when.recurring.occurences': { $gte: 1 } },
          { $or: [
            { $and: [
              { 'when.recurring.type': { $eq: 'day' } },
              // compare effective end date: endingDate + # of occurences * every X days * # of milliseconds
              {
                'when.ending': {
                  $gte: {
                    $subtract: [
                      new Date(), {
                        $multiply: [
                          'when.recurring.occurences',
                          'when.recurring.every',
                          24 * 60 * 60000
                        ]
                      }
                    ]
                  }
                }
              }
            ] },
            { $and: [
              { 'when.recurring.type': { $eq: 'week' } },
              // compare effective end date: endingDate + # of occurences * every X weeks * # of milliseconds
              {
                'when.ending': {
                  $gte: {
                    $subtract: [
                      new Date(), {
                        $multiply: [
                          'when.recurring.occurences',
                          'when.recurring.every',
                          7 * 24 * 60 * 60000
                        ]
                      }
                    ]
                  }
                }
              }
            ] },
            { $and: [
              { 'when.recurring.type': { $eq: 'month' } },
              // compare effective end date: endingDate + # of occurences * every X months * # of milliseconds
              {
                'when.ending': {
                  $gte: {
                    $subtract: [
                      new Date(), {
                        $multiply: [
                          'when.recurring.occurences',
                          'when.recurring.every',
                          (365.25 / 12) * 24 * 60 * 60000
                        ]
                      }
                    ]
                  }
                }
              }
            ] }
          ] }
        ] },
        { $and: [
          { 'when.repeat': { $eq: true } },
          { 'when.recurring.until': { $gte: new Date() } }
        ] }
      ] },
    {
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
