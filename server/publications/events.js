import { Meteor } from 'meteor/meteor'
import Events from '/imports/both/collections/events'

Meteor.publish('Events.getEvents', function () {
  return Events.find({})
})
