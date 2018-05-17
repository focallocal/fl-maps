import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import possibleCategories from './utils/possibleCategories.json'
import possibleEventHours from './utils/possibleEventHours'

SimpleSchema.extendOptions(['uniforms'])

const Events = new Mongo.Collection('events')
const EventsSchema = new SimpleSchema({

  // Organiser
  'organiser': {
    type: Object,
    autoValue: () => {
      const { _id, profile } = Meteor.user() || { _id: '-', profile: { name: '-' } }
      return {
        _id,
        name: profile.name
      }
    }
  },
  'organiser._id': {
    type: String
  },
  'organiser.name': {
    type: String
  },

  // Categories
  'categories': {
    type: Array,
    uniforms: {
      customType: 'select',
      selectOptions: {
        multi: true,
        labelKey: 'name'
      },
      allowedValues: possibleCategories,
      label: 'Choose a Category',
      placeholder_: 'Pick your event\'s categories'
    }
  },
  'categories.$': {
    type: Object
  },
  'categories.$.name': {
    type: String,
    allowedValues: possibleCategories.reduce((arr, obj) => (arr.concat(obj.name)), [])
  },
  'categories.$.color': {
    type: String,
    allowedValues: possibleCategories.reduce((arr, obj) => (arr.concat(obj.color)), [])
  },

  // Details
  'name': {
    type: String,
    uniforms: {
      label: 'Name'
    }
  },
  'address': {
    type: Object,
    uniforms: {
      customType: 'select',
      selectOptions: {
        'googleMaps': true
      },
      label: 'Select an Address',
      placeholder_: 'Ex: New York, USA'
    }
  },
  'address.name': {
    type: String
  },
  'address.lat': {
    type: Number
  },
  'address.lng': {
    type: Number
  },
  'findHints': {
    type: String,
    max: 250,
    uniforms: {
      customType: 'textarea',
      label: 'How To Find You?'
    }
  },
  'startingDate': {
    type: Date,
    uniforms: {
      label: 'Starting Date'
    }
  },
  'startingTime': {
    type: String,
    allowedValues: possibleEventHours,
    uniforms: {
      customType: 'select',
      label: 'Starting Time'
    }
  },
  'endingDate': {
    type: Date,
    uniforms: {
      label: 'Ending Date'
    }
  },
  'endingTime': {
    type: String,
    allowedValues: possibleEventHours,
    uniforms: {
      customType: 'select',
      label: 'Ending Time'
    }
  },

  // Description and More
  'overview': {
    type: String,
    max: 150,
    uniforms: {
      customType: 'textarea',
      label: 'Overview'
    }
  },
  'description': {
    type: String,
    max: 400,
    uniforms: {
      customType: 'textarea',
      label: 'Description'
    }
  },
  engagement: {
    type: Object
  },
  'engagement.limit': {
    type: Number,
    min: 0,
    uniforms: {
      customType: 'number',
      label: 'Attendee Limit (leave empty if no limit)'
    }
  },
  'engagement.attendees': {
    type: Array,
    autoValue: () => []
  },
  'engagement.attendees.$': {
    type: String
  }
}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true,
    removeNullsFromArrays: true
  }
})

Events.attachSchema(EventsSchema)

export {
  Events as default,
  EventsSchema
}
