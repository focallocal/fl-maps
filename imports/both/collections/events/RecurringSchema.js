import SimpleSchema from 'simpl-schema'

SimpleSchema.extendOptions(['uniforms'])

const RecurringSchema = new SimpleSchema({
  'type': {
    type: String,
    allowedValues: ['week', 'month', 'year'],
    defaultValue: 'week',
    uniforms: {
      customType: 'select',
      selectOptions: {
        labelMapper: {
          'week': 'week(s)',
          'month': 'month(s)',
          'year': 'year(s)'
        }
      }
    }
  },
  'every': {
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6],
    defaultValue: 1,
    uniforms: {
      customType: 'select'
    }
  },
  'days': {
    type: Array,
    custom: function () {
      if (!this.value || !this.value[0]) {
        return 'required'
      }
    }
  },
  'days.$': {
    type: Number,
    allowedValues: Array(31).fill(1).map((x, y) => x + y)
  },
  'forever': {
    type: Boolean,
    defaultValue: false
  },
  'repeat': {
    type: Number,
    min: 1,
    max: 1000,
    allowedValues: Array(100).fill(1).map((x, y) => x + y),
    defaultValue: 10,
    optional: true,
    custom: function () {
      if (this.field('when.recurring.forever').value) {
        return undefined
      }

      if (!this.value) {
        return 'required'
      }
    }
  },
  'until': {
    type: Date,
    optional: true,
    custom: function () {
      if (this.field('when.recurring.forever').value) {
        return undefined
      }

      if (!this.value) {
        return 'required'
      }
    },
    uniforms: {
      label: 'Until'
    }
  }
})

export default RecurringSchema
