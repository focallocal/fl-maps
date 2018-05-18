import SimpleSchema from 'simpl-schema'
import * as helpers from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const DaysSchema = new SimpleSchema({
  'day': {
    type: String,
    allowedValues: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  'startingTime': helpers.startingTime,
  'endingTime': helpers.endingTime
})

export default DaysSchema
