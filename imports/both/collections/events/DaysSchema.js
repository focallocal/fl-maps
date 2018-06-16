import SimpleSchema from 'simpl-schema'
import * as helpers from './helpers'

SimpleSchema.extendOptions(['uniforms'])

const DaysSchema = new SimpleSchema({
  'day': {
    type: String,
    optional: true,
    allowedValues: helpers.weekDays,
    autoValue: function () {
      const startingTime = this.siblingField('startingTime').value
      const endingTime = this.siblingField('endingTime').value

      if (!this.value && startingTime && endingTime) {
        const index = this.key.match(/\d/) // get index in array
        return helpers.weekDays[index]
      }
    }
  },
  'startingTime': helpers.startingTime,
  'endingTime': helpers.endingTime
})

export default DaysSchema
