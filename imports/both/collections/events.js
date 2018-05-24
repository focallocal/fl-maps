import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import possibleCategories from './events/helpers/possibleCategories.json'
import OneDaySchema from './events/OneDaySchema'
import SpecificPeriodSchema from './events/SpecificPeriodSchema'
import RecurringSchema from './events/RecurringSchema'

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
    custom: function () {
      if (!this.value) {
        return 'required'
      }

      if (!this.value[0]) {
        return 'required'
      }
    },
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
    custom: function () {
      if (!this.value) {
        return 'required'
      }

      if (!this.value.name) {
        return 'required'
      }
    },
    uniforms: {
      customType: 'select',
      selectOptions: {
        'googleMaps': true
      },
      label: 'Select an address',
      placeholder_: 'Ex: New York, USA'
    }
  },
  'address.name': {
    type: String
  },
  'address.location': {
    type: Object
  },
  'address.location.type': {
    type: String,
    defaultValue: 'Point',
    allowedValues: ['Point']
  },
  'address.location.coordinates': {
    type: Array,
    max: 2,
    min: 2
  },
  'address.location.coordinates.$': {
    type: Number
  },
  'findHints': {
    type: String,
    max: 250,
    uniforms: {
      customType: 'textarea',
      label: 'How to find you?'
    }
  },

  // Date and Time
  'when': {
    type: Object,
    custom: function () {
      const type = this.field('when.type')
      const obj = !this.field('when.' + type)
      // ensure we have a valid when object
      if (!type || obj.value) {
        return 'required'
      }
    }
  },
  'when.type': {
    type: String,
    allowedValues: ['oneDay', 'specificPeriod', 'recurring'],
    custom: function () {
      if (!this.value) {
        return 'required'
      }
    }
  },
  'when.oneDay': {
    type: OneDaySchema,
    autoValue: function () {
      if (this.field('when.type').value !== 'oneDay') {
        return null
      }
    },
    optional: true
  },
  'when.specificPeriod': { // is the same as regularHours
    type: SpecificPeriodSchema,
    optional: true,
    autoValue: function () {
      if (this.field('when.type').value !== 'specificPeriod') {
        return null
      }
    }
  },
  'when.recurring': {
    type: RecurringSchema,
    optional: true,
    autoValue: function () {
      if (this.field('when.type').value !== 'recurring') {
        return null
      }
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
    type: Object,
    defaultValue: {}
  },
  'engagement.limit': {
    type: Number,
    min: 0,
    defaultValue: 0,
    uniforms: {
      customType: 'number',
      label: 'Attendee limit (leave empty if no limit)'
    }
  },
  'engagement.attendees': {
    type: Array,
    defaultValue: []
  },
  'engagement.attendees.$': {
    type: String,
    optional: true
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

if (Meteor.isServer) {
  Events._ensureIndex({ 'address.location': '2dsphere' })
}

export {
  Events as default,
  EventsSchema
}
