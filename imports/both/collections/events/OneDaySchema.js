import SimpleSchema from 'simpl-schema'
import * as helpers from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const OneDaySchema = new SimpleSchema({
  'startingDate': {
    type: Date,
    uniforms: {
      label: 'Date'
    }
  },
  'startingTime': helpers.startingTime,
  'endingTime': helpers.endingTime
})

export default OneDaySchema
