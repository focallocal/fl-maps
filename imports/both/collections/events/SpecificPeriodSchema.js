import SimpleSchema from 'simpl-schema'
import DaysSchema from './DaysSchema'

SimpleSchema.extendOptions(['uniforms'])

const SpecificPeriodSchema = new SimpleSchema({
  'startingDate': {
    type: Date,
    optional: true, // if value is null than it's a regularHours type of date
    custom: function () {
      const endingDate = this.field('when.specificPeriod.endingDate')

      if (!this.value && endingDate.value) {
        return 'required'
      }
    },
    uniforms: {
      label: 'From'
    }
  },
  'endingDate': {
    type: Date,
    optional: true,
    custom: function () {
      const startingDate = this.field('when.specificPeriod.startingDate')

      if (!this.value && startingDate.value) {
        return 'required'
      }
    },
    uniforms: {
      label: 'Until'
    }
  },
  'days': {
    type: Array,
    custom: function () {
      if (!this.value) {
        return 'required'
      }

      if (!this.value[0]) {
        return 'required'
      }
    }
  },
  'days.$': {
    type: DaysSchema
  }
})

export default SpecificPeriodSchema
