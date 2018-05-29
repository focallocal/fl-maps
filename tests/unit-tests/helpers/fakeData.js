import faker from 'faker'

export function generateFakeEvents (length = 3) {
  return Array(length).fill(generateEvent())
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
    'when': {
      type: 'oneDay',
      startingDate: faker.date.future(),
      startingTime: '15:00',
      endingTime: '16:00'
    },
    'overview': faker.lorem.sentences(15),
    'description': faker.lorem.sentences(8),
    'engagement': {
      'limit': faker.random.number({ max: 300 }),
      'attendees': []
    }
  }
}
