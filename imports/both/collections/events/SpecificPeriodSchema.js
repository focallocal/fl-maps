import SimpleSchema from 'simpl-schema'
import DaysSchema from './DaysSchema'

SimpleSchema.extendOptions(['uniforms'])

const SpecificPeriodSchema = new SimpleSchema({
  'startingDate': {
    type: Date,
    optional: true, // if value is null than it's a regularHours type of date
    uniforms: {
      label: 'From'
    }
  },
  'endingDate': {
    type: Date,
    optional: true,
    uniforms: {
      label: 'Until'
    }
  },
  'days': {
    type: Array
  },
  'days.$': {
    type: DaysSchema,
    optional: true
  }
})

export default SpecificPeriodSchema
