import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import { startingTime, endingTime, startingDate, endingDate, getHour, weekDays, determinePosition } from './helpers'
import possibleCategories from '/imports/both/i18n/en/categories.json'
import labels from '/imports/both/i18n/en/new-event-modal.json'
import DaySchema from './DaysSchema'

// sets allowedValues to include Community Resource without it being in dropdown
// someone should refactor this in the future: let allowedValues = possibleCategories.concat([{ 'name': 'Meet Me and Take #PublicHappiness to the Street', 'color': '#f82d2d' }])
let allowedValues = possibleCategories

// Extend SimpleSchema to support the uniforms field.
SimpleSchema.extendOptions(['uniforms'])

const Events = new Mongo.Collection('events')

const EventsSchema = new SimpleSchema({

  // Organiser
  'organiser': {
    type: Object,
    autoValue: function () {
      // Dont change this!
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
      if (!this.value || this.value.length === 0) {
        return 'required'
      }
    },
    uniforms: {
      customType: 'select',
      selectOptions: {
        multi: true,
        labelKey: 'name'
      },
      allowedValues: possibleCategories, // keep it here so options will be rendered by react-select
      label: labels.categories,
      placeholder_: 'Pick your event\'s categories'
    }
  },
  'categories.$': {
    type: Object
  },
  'categories.$.name': {
    type: String,
    allowedValues: allowedValues.reduce((arr, obj) => (arr.concat(obj.name)), [])
  },
  'categories.$.color': {
    type: String,
    allowedValues: allowedValues.reduce((arr, obj) => (arr.concat(obj.color)), []),
    defaultValue: '#f82d2d'
  },
  'categories.resourceType': {
    type: String,
    defaultValue: ''
  },

  // Details
  'name': {
    type: String,
    uniforms: {
      label: labels.event_name
    }
  },
  'address': {
    type: Object,
    custom: function () {
      if (!this.value || !this.value.name) {
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
      label: labels.contact_info
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
  'when.startingDate': startingDate,
  'when.endingDate': endingDate,
  'when.startingTime': {
    ...startingTime,
    optional: true,
    custom: function () {
      if (this.field('when.multipleDays').value) {
        return undefined
      }

      if (!this.value) {
        return 'required'
      }
    },
    autoValue: function () {
      if (this.field('when.multipleDays').value) {
        return null
      }
      if (!this.value) {
        return getHour()
      }
    }
  },
  'when.endingTime': {
    ...endingTime,
    optional: true,
    custom: function () {
      if (this.field('when.multipleDays').value) {
        return undefined
      }

      if (!this.value) {
        return 'required'
      }
    },
    autoValue: function () {
      if (this.field('when.multipleDays').value) {
        return null
      }

      if (!this.value) {
        return getHour(1)
      }
    }
  },
  'when.multipleDays': {
    type: Boolean,
    defaultValue: false
  },
  'when.days': { // used with multipleDays
    type: Array,
    optional: true,
    custom: function () {
      if (!this.field('when.multipleDays').value) {
        return undefined
      }

      if (!this.value || this.value.length === 0) {
        return 'required'
      }
    },
    autoValue: function () {
      if (!this.field('when.multipleDays').value) {
        return null
      }

      if (this.value) {
        return this.value.map(d => !d ? false : d) // remove empty slots
      }
    }
  },
  'when.days.$': {
    type: SimpleSchema.oneOf(DaySchema, Boolean),
    required: false
  },
  'when.repeat': {
    type: Boolean,
    defaultValue: false
  },
  'when.recurring': { // used with repeat
    type: Object,
    optional: true,
    autoValue: function () {
      if (!this.field('when.repeat').value) {
        return null
      }
    }
  },
  'when.recurring.type': {
    type: String,
    allowedValues: ['day', 'week', 'month'],
    defaultValue: 'day',
    uniforms: {
      customType: 'select',
      selectOptions: {
        labelMapper: {
          'day': 'day(s)',
          'week': 'week(s)',
          'month': 'month(s)'
        }
      }
    }
  },
  'when.recurring.days': { // used with 'week'
    type: Array,
    optional: true,
    custom: function () {
      if (this.siblingField('type') === 'week') {
        const atLeastOneDay = !this.value || !this.value.join('')
        return atLeastOneDay ? 'required' : undefined
      }
    },
    autoValue: function () {
      const type = this.siblingField('type')
      if (type.value !== 'week') {
        return null
      }
    }
  },
  'when.recurring.days.$': {
    type: String,
    allowedValues: weekDays
  },
  'when.recurring.monthly': {
    type: Object,
    optional: true,
    autoValue: function () {
      if (this.siblingField('type').value === 'month') {
        return this.value || {} // empty object will generate default values automatically
      } else {
        return null
      }
    }
  },
  'when.recurring.monthly.type': {
    type: String,
    allowedValues: ['byPosition', 'byDayInMonth'],
    autoValue: function () {
      if (!this.value) {
        return 'byDayInMonth'
      }
    }
  },
  'when.recurring.monthly.value': {
    type: Number,
    autoValue: function () {
      const type = this.siblingField('type')
      let value = this.value
      let dayInMonth = new Date().getDate()

      if (type.value === 'byDayInMonth') {
        value = (typeof value) === 'number' && value >= 0 ? value : dayInMonth
        return value > 31 ? 31 : value < 1 ? 1 : value
      } else {
        value = (typeof value) === 'number' && value >= 0 ? value : Number(determinePosition(dayInMonth)[0])
        return value > 4 ? 4 : value < 1 ? 1 : value
      }
    }
  },
  'when.recurring.every': {
    type: Number,
    min: 0,
    max: 12,
    defaultValue: 1,
    autoValue: function () {
      if (!this.value || this.value < 1) {
        return 1
      }
    }
  },
  'when.recurring.forever': {
    type: Boolean,
    optional: true
  },
  'when.recurring.occurences': {
    type: Number,
    min: 1,
    max: 999,
    optional: true,
    custom: function () {
      if (this.siblingField('forever').value) {
        return undefined
      }
    },
    autoValue: function () {
      if (this.siblingField('forever').value) {
        return null
      }
    }
  },
  'when.recurring.until': {
    type: Date,
    optional: true
  },

  // Description and More
  'overview': {
    type: String,
    max: 150,
    uniforms: {
      customType: 'textarea',
      label: labels.overview
    }
  },
  'description': {
    type: String,
    max: 400,
    uniforms: {
      customType: 'textarea',
      label: labels.description
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
    type: Object,
    optional: true
  },
  'engagement.attendees.$.id': {
    type: String,
    max: 36
  },
  'engagement.attendees.$.name': {
    type: String,
    max: 120
  },
  'createdAt': {
    type: Date,
    autoValue: () => new Date()
  }
}, {
  clean: {
    filter: true,
    autoConvert: true,
    removeEmptyStrings: true,
    trimStrings: true,
    getAutoValues: true
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
