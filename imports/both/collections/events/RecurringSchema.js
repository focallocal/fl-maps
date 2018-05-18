import SimpleSchema from 'simpl-schema'

SimpleSchema.extendOptions(['uniforms'])

const RecurringSchema = new SimpleSchema({
  'type': {
    type: String,
    allowedValues: ['Weekly', 'Monthly', 'Yearly']
  },
  'startingDate': {
    type: Date,
    uniforms: {
      label: 'Starting Date'
    }
  },
  'endingDate': {
    type: Date,
    uniforms: {
      label: 'Ending Date'
    }
  }
})

export default RecurringSchema
