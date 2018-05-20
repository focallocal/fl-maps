import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Events, { EventsSchema } from '/imports/both/collections/events'

const newEvent = new ValidatedMethod({
  name: 'Events.newEvent',
  mixins: [],
  validate: EventsSchema.validator(),
  run (event) {
    if (!Meteor.user()) {
      throw new Meteor.Error('Events.newEvent', 'Only users can perform this task')
    }

    return Events.insert(event, { validate: false, filter: false })
  }
})
