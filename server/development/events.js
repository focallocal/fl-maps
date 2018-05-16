/*
  Generate fake events for development
*/

import { Meteor } from 'meteor/meteor'
import Events from '/imports/both/collections/events'
import faker from 'faker'

if (Meteor.isDevelopment) {
  Meteor.methods({
    'upsertFake' () {
      for (let i = 0; i < 20; i++) {
        Events.upsert({ _id: `fake-id-${i}`}, {
          $set: generateEvent()
        })
      }
    }
  })

  Meteor.call('upsertFake')
}

function generateEvent () {
  return {
    'organiser': {
      _id: faker.random.uuid(),
      name: faker.name.findName()
    },
    'categories': [
      { 'name': 'Pillow Fight 4Connection', 'color': '#d50000' },
      { 'name': 'Take a Smile', 'color': '#33691e' }
    ],
    'name': 'Test Event!',
    'address': {
      name: 'fake address',
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    },
    'findHints': faker.lorem.sentence(15),
    'startingDate': faker.date.future(),
    'startingTime': '16:00',
    'endingDate': faker.date.future(),
    'endingTime': '23:00',
    'overview': faker.lorem.sentences(15),
    'description': faker.lorem.sentences(8),
    'engagement': {
      'limit': faker.random.number({ max: 300 }),
      'attendees': []
    }
  }
}
