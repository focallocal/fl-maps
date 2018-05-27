import SimpleSchema from 'simpl-schema'
import { weekDays } from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const RecurringSchema = new SimpleSchema({
  'type': {
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
  'days': { // used with 'week'
    type: Array,
    optional: true,
    custom: function () {
      if (this.field('when.recurring.type').value === 'week') {
        const atLeastOneDay = !this.value || !this.value.join('')
        return atLeastOneDay ? 'required' : undefined
      }
    },
    autoValue: function () {
      const type = this.field('when.recurring.type')
      if (type.isSet && type.value !== 'week') {
        return null
      }
    }
  },
  'days.$': {
    type: String,
    allowedValues: weekDays
  },
  'monthly': {
    type: Object,
    optional: true,
    autoValue: function () {
      if (this.field('when.recurring.type').value === 'month') {
        return this.value || {} // empty object will generate default values automatically
      } else {
        return null
      }
    }
  },
  'monthly.type': {
    type: String,
    allowedValues: ['byPosition', 'byDayInMonth'],
    autoValue: function () {
      if (!this.value) {
        return 'byDayInMonth'
      }
    }
  },
  'monthly.value': {
    type: Number,
    autoValue: function () {
      const type = this.field('when.monthly.type').value
      const value = this.value

      if (type === 'byDayInMonth') {
        return value > 31 ? 31 : value
      } else {
        return value > 4 ? 4 : value
      }
    }
  },
  'every': {
    type: Number,
    min: 1,
    max: 12,
    defaultValue: 1
  },
  'forever': {
    type: Boolean,
    optional: true
  },
  'repeat': {
    type: Number,
    min: 1,
    max: 1000,
    allowedValues: Array(100).fill(1).map((x, y) => x + y),
    optional: true,
    custom: determineRepeatValue,
    autoValue: determineRepeatValue
  }
})

function determineRepeatValue (returnValue) {
  const forever = this.field('when.recurring.forever').value

  if (forever) {
    return returnValue
  }
}

export default RecurringSchema
