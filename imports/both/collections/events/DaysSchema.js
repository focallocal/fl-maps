import SimpleSchema from 'simpl-schema'
import * as helpers from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const DaysSchema = new SimpleSchema({
  'day': {
    type: String,
    allowedValues: weekDays,
    autoValue: function () {
      if (!this.value) {
        const index = this.key.match(/\d/) // get index in array
        return weekDays[index]
      }
    }
  },
  'startingTime': helpers.startingTime,
  'endingTime': helpers.endingTime
})

export default DaysSchema
