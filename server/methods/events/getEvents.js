import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events from '/imports/both/collections/events'
import SimpleSchema from 'simpl-schema'

const getEvent = new ValidatedMethod({
  name: 'Events.getEvents',
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
