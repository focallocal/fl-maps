import { EventsSchema, bridge } from '../events/index'
import possibleCategories from '/imports/both/i18n/en/categories.json'
import { determinePosition } from '../events/helpers'

describe('Events', () => {
  // Always remember to update those tests if changing something in the schema.

  const validateTheWhenObject = obj => {
    const validator = bridge.getValidator()

    validator.validate({
      when: obj
    }, { keys: ['when'] })

    return validator.validationErrors()
  }

  test('validate empty form should fail', () => {
    const validator = bridge.getValidator()
    try {
      validator.validate({})
    } catch (ex) {
      expect(ex.error).toEqual('validation-error')
    }
  })

  test('validate with invalid categories value should fail', () => {
    const validator = bridge.getValidator()
    try {
      validator.validate({
        categories: [{ name: 'unknown category', color: '#fff' }]
      })
    } catch (ex) {
      expect(ex.details[0].type).toEqual('notAllowed')
    }
  })

  test('validate with invalid location type should fail', () => {
    const validator = bridge.getValidator()
    try {
      validator.validate({
        address: {
          location: {
            type: 'OnlyPointAllowed'
          }
        }
      })
    } catch (ex) {
      expect(ex.details[1].message).toEqual('OnlyPointAllowed is not an allowed value')
    }
  })

  test('basic "when" values should validate successfully', () => {
    const errors = validateTheWhenObject({
      startingTime: '15:00',
      endingTime: '16:00',
      multipleDays: false,
      repeat: false
    })

    expect(errors).toHaveLength(0)
  })

  test('validating with "multipleDays=true" and valid "days" values should validate successfully', () => {
    const errors = validateTheWhenObject({
      multipleDays: true,
      days: [
        {
          day: 'Sunday',
          startingTime: '15:00',
          endingTime: '16:00'
        }
      ]
    })

    expect(errors).toHaveLength(0)
  })

  test('validating with "multipleDays=true" and empty "days" array should fail', () => {
    const errors = validateTheWhenObject({
      multipleDays: true,
      days: [] // empty array should fail
    })

    expect(errors[0]).toEqual({ 'name': 'when.days', 'type': 'required', 'value': [] })
  })

  test('validating with "multipleDays=true" and unvalid "day" values should fail', () => {
    const errors = validateTheWhenObject({
      multipleDays: true,
      days: [
        { day: 'InvalidDay', startingTime: '13:000', endingTime: '0' }
      ]
    })

    expect(errors).toHaveLength(3)
  })

  test('validating with "multipleDays=true" and days=[undefined, { ...day }]', () => {
    const errors = validateTheWhenObject({
      multipleDays: true,
      days: [undefined, {
        day: 'Sunday',
        startingTime: '15:00',
        endingTime: '16:00'
      }, undefined]
    })

    expect(errors).toHaveLength(0)
  })

  test('cleaning with "multipleDays=true" should enforce ending/starting time to be null', () => {
    const obj = EventsSchema.clean({
      when: {
        multipleDays: true,
        startingTime: new Date(),
        endingTime: new Date()
      }
    })

    expect(obj.when.startingTime).toEqual(null)
    expect(obj.when.endingTime).toEqual(null)
  })

  test('basic "recurring" values should validate successfully', () => {
    const errors = validateTheWhenObject({
      repeat: true,
      recurring: {
        type: 'day',
        every: 6,
        forever: true
      }
    })

    expect(errors).toHaveLength(0)
  })

  test('cleaning with "repeat=false" should enforce "when.recurring" to be null', () => {
    const obj = EventsSchema.clean({
      when: {
        repeat: false,
        recurring: {
          type: 'day',
          every: 6,
          forever: true
        }
      }
    })

    expect(obj.when.recurring).toEqual(null)
  })

  test('cleaning with "recurring.type=day" should enforce "recurring.days" and "recurring.monthly" to be null', () => {
    const obj = EventsSchema.clean({
      when: {
        repeat: true,
        recurring: {
          type: 'day',
          days: [{}],
          monthly: {}
        }
      }
    })

    expect(obj.when.recurring.days).toEqual(null)
    expect(obj.when.recurring.monthly).toEqual(null)
  })

  test('validating with "recurring.type=week" and invalid "days" array should fail', () => {
    const errors = validateTheWhenObject({
      repeat: true,
      recurring: {
        type: 'week',
        days: ['InvalidDay'] // empty array should fail
      }
    })

    expect(errors).toHaveLength(1)
  })

  test('cleaning with "recurring.type=month" should set "byDayInMonth" as a value', () => {
    const obj = EventsSchema.clean({
      when: {
        repeat: true,
        recurring: {
          type: 'month'
        }
      }
    })

    expect(obj.when.recurring.monthly.type).toEqual('byDayInMonth')
  })

  test('cleaning with "recurring.type=month" and "monthly.value=undefined" should resolve to defaults', () => {
    const dayInMonth = new Date().getDate()
    const baseObj = (type) => (
      {
        when: {
          repeat: true,
          recurring: {
            type: 'month',
            monthly: {
              type: type
            }
          }
        }
      }
    )

    const obj = EventsSchema.clean(baseObj('byDayInMonth'))
    const obj1 = EventsSchema.clean(baseObj('byPosition'))

    expect(obj.when.recurring.monthly.value).toEqual(dayInMonth)
    expect(obj1.when.recurring.monthly.value).toEqual(Number(determinePosition(dayInMonth)[0]))
  })

  test('cleaning with "recurring.type=month" should set limitations on "monthly.value', () => {
    const baseObj = (monthly) => (
      {
        name: 'test',
        when: {
          startingDate: new Date(),
          repeat: true,
          recurring: {
            type: 'month',
            monthly
          }
        }
      }
    )

    const obj1 = baseObj({ type: 'byDayInMonth', value: 35 })
    const obj2 = baseObj({ type: 'byDayInMonth', value: 0 })
    const obj3 = baseObj({ type: 'byPosition', value: 10 })
    const obj4 = baseObj({ type: 'byPosition', value: 0 })

    expect(EventsSchema.clean(obj1).when.recurring.monthly.value).toEqual(31)
    expect(EventsSchema.clean(obj2).when.recurring.monthly.value).toEqual(1)
    expect(EventsSchema.clean(obj3).when.recurring.monthly.value).toEqual(4)
    expect(EventsSchema.clean(obj4).when.recurring.monthly.value).toEqual(1)
  })

  test('cleaning with "recurring.forever=true" should enforce "recurring.repeat" to be null', () => {
    const obj = EventsSchema.clean({
      when: {
        repeat: true,
        recurring: {
          type: 'day',
          forever: true,
          occurences: 100
        }
      }
    })

    expect(obj.when.recurring.occurences).toEqual(null)
  })

  it('should successfully validate a full basic form', () => {
    let form = EventsSchema.clean({
      name: 'test form',
      address: {
        name: 'test location',
        location: {
          type: 'Point',
          coordinates: [70.0051, -43.0891]
        }
      },
      categories: [possibleCategories[0]],
      findHints: 'find hints',
      when: {
        startingDate: new Date(),
        endingDate: new Date(),
        startingTime: '15:00',
        endingTime: '20:00'
      },
      overview: 'test overview',
      description: 'test description'
    })

    const validationContext = EventsSchema.newContext()
    validationContext.validate(form)
    expect(validationContext.isValid()).toEqual(true)
  })

  it('match schema keys', () => {
    expect(EventsSchema._schemaKeys).toEqual(
      [
        'organiser',
        'organiser._id',
        'organiser.name',
        'categories',
        'categories.$',
        'categories.$.name',
        'categories.$.color',
        'name',
        'address',
        'address.name',
        'address.location',
        'address.location.type',
        'address.location.coordinates',
        'address.location.coordinates.$',
        'findHints',
        'when',
        'when.startingDate',
        'when.endingDate',
        'when.startingTime',
        'when.endingTime',
        'when.multipleDays',
        'when.days',
        'when.days.$',
        'when.repeat',
        'when.recurring',
        'when.recurring.type',
        'when.recurring.days',
        'when.recurring.days.$',
        'when.recurring.monthly',
        'when.recurring.monthly.type',
        'when.recurring.monthly.value',
        'when.recurring.every',
        'when.recurring.forever',
        'when.recurring.occurences',
        'when.recurring.until',
        'overview',
        'description',
        'engagement',
        'engagement.limit',
        'engagement.attendees',
        'engagement.attendees.$',
        'engagement.attendees.$.id',
        'engagement.attendees.$.name',
        'createdAt'
      ]
    )
  })
})
