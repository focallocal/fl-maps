import SimpleSchema from 'simpl-schema'
import DaysSchema from './DaysSchema'
import * as helpers from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const RecurringSchema = new SimpleSchema({
  'type': {
    type: String,
    allowedValues: ['week', 'month', 'year'],
    autoValue: () => 'week',
    uniforms: {
      customType: 'select',
      selectOptions: {
        labelMapper: {
          'week': 'week(s)',
          'month': 'month(s)',
          'year': 'year(s)'
        },
        defaultValueIndex: 0
      }
    }
  },
  'every': {
    type: String,
    allowedValues: [1, 2, 3, 4, 5, 6],
    autoValue: () => 1,
    uniforms: {
      customType: 'select',
      selectOptions: {
        defaultValueIndex: 0
      }
    }
  },
  'days': {
    type: Array
  },
  'days.$': {
    type: Number,
    allowedValues: Array(31).fill(1).map((x, y) => x + y)
  }
})

export default RecurringSchema
