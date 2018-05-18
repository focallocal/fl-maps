import SimpleSchema from 'simpl-schema'
import { startingTime, endingTime } from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const SpecificPeriodSchema = new SimpleSchema({
  'startingDate': {
    type: Date,
    optional: true, // if value is null than its a regular event
    uniforms: {
      label: 'Starting Date'
    }
  },
  'endingDate': {
    type: Date,
    optional: true,
    uniforms: {
      label: 'Ending Date'
    }
  },
  'days': {
    type: Array
  },
  'days.$': {
    type: Object,
    optional: true
  },
  'days.$.day': {
    type: String,
    allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  'days.$.startingTime': startingTime,
  'days.$.endingTime': endingTime
})

export default SpecificPeriodSchema
