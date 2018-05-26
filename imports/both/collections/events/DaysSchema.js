import SimpleSchema from 'simpl-schema'
import * as helpers from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const DaysSchema = new SimpleSchema({
  'day': {
    type: String,
    allowedValues: helpers.weekDays,
    autoValue: function () {
      if (!this.value) {
        const index = this.key.match(/\d/) // get index in array
        return helpers.weekDays[index]
      }
    }
  },
  'startingTime': helpers.startingTime,
  'endingTime': helpers.endingTime
})

export default DaysSchema
