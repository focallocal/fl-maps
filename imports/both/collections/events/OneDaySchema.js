import SimpleSchema from 'simpl-schema'
import { startingTime, endingTime } from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const OneDaySchema = new SimpleSchema({
  'startingDate': {
    type: Date,
    uniforms: {
      label: 'Date'
    }
  },
  'startingTime': startingTime,
  'endingTime': endingTime
})

export default OneDaySchema
