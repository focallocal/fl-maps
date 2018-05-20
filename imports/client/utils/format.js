
export function formatCategories (categories) {
  /*
    Format array of categories into a sentence
  */

  return categories.reduce((str, category, index) => {
    str += `${category.name}, `

    if (!categories[index + 1]) {
      str = str.substr(0, str.length - 2)
    }

    return str
  }, '')
}

export function formatReactSelectOptions (options = [], labelKey, labelMapper) {
  /*
    React-select expects an array of objects with the following format -> { value: '', label: '' }
    So we must ensure our array of options always match that format.

    # If labelKey is undefined
      the options array we provide consist of primitive types.

    # We save the index of the option as the value so we can later retrieve it easily
      (react-select doesn't allow objects as values)
  */

  let options_ = options
  if (!options.reduce) { // it's a value!
    options_ = [options]
  }

  return options_.reduce(function (arr, option, index) {
    return arr.concat({
      value: index,
      label: labelMapper ? labelMapper[option] : labelKey ? option[labelKey] : option
    })
  }, [])
}

export function formatDate (date) {
  if (!date) {
    throw new Error('please provide a valid date')
  }

  return new Date(date).toISOString().substring(0, 10).split('-').join('/')
}

export function formatWhenObject (data) {
  /* Format the "when" section based on the date type */

  if (data.type === 'oneDay') {
    const { startingTime, endingTime, startingDate } = data.oneDay
    return `${formatDate(startingDate)} on ${startingTime} - ${endingTime}`
  }

  if (data.type === 'specificPeriod') {
    const { startingDate, endingDate, days } = data.specificPeriod
    return `every ${formatDaysAndHours(days)}, from ${formatDate(startingDate)} until ${formatDate(endingDate)}`
  }

  if (data.type === 'regularHours') {
    return `every ${formatDaysAndHours(data.specificPeriod.days)}`
  }

  if (data.type === 'recurring') {
    const { days, every, type, repeat, until, forever } = data.recurring

    if (forever) {
      return `every ${every} ${type} on ${getDaysNames(days)}`
    } else {
      return `every ${every} ${type} on ${getDaysNames(days)} for ${repeat} occasions (until ${formatDate(until)})`
    }
  }
}

function formatDaysAndHours (days) {
  return days.reduce((str, day, index) => {
    const last = !days[index + 1]
    const lastNext = !days[index + 2]

    return str += `
      ${last ? 'and ' : ''}
      ${day.day} (${day.startingTime} - ${day.endingTime})${(last || lastNext) ? '' : ', '}`
  }, '')
}

function getDaysNames (days) {
  let daysMapper = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }
  return days.reduce((str, day, index) => {
    return str += daysMapper[day] + (days[index + 1] ? '/' : '')
  }, '')
}
