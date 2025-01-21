/*
  Generate fake events for development
*/

import { Meteor } from 'meteor/meteor'
import Events from '/imports/both/collections/events'
import faker from 'faker'

/*
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
*/
function generateEvent () {
  return {
    'organiser': {
      _id: faker.random.uuid(),
      name: faker.name.findName()
    },
    'categories': [
      { 'name': 'Pillow Fight 4Connection'},
      { 'name': 'Take a Smile'}
    ],
    'name': 'Test Event!',
    'address': {
      name: 'fake address',
      location: {
        // Include the necessary properties for the location object
        type: 'Point',  // Example type, adjust based on your application
        coordinates: [
          parseFloat(faker.address.longitude()),
          parseFloat(faker.address.latitude())
        ]
      },
    },
    'findHints': faker.lorem.sentence(5),
    'startingDate': faker.date.future(),
    'startingTime': '16:00',
    'endingDate': faker.date.future(),
    'endingTime': '23:00',
    'overview': faker.lorem.sentences(5),
    'description': faker.lorem.sentences(8),
    'engagement': {
      'limit': faker.random.number({ max: 300 }),
      'attendees': []
    },
    'when': {
      'startingDate': faker.date.future(),
      'endingDate': faker.date.future(),
      'startingTime': '16:00',
      'endingTime': '23:00',
      'multipleDays': false, // or set to the appropriate value
      'repeat': false // or set to the appropriate value
    }
  }
}
