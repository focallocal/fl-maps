import haversine from 'haversine'

export function formatMilesFromLocation (userLocation, coordinates) {
  if (!userLocation) {
    return 'couldn\'t calculate distance to location'
  }

  const userPosition = { latitude: userLocation.lat, longitude: userLocation.lng }
  const addressPosition = { longitude: coordinates[0], latitude: coordinates[1] }

  const distance = haversine(userPosition, addressPosition, { unit: 'miles' }).toFixed(1)

  return distance + ' miles away'
}

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

export function formatDateWithWords (date) {
  if (!date) {
    throw new Error('please provide a valid date')
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const day = days[date.getDay()]

  return `${day}, ${formatDate(date)}`
}

export function formatWhenObject (data) {
  /* Format the "when" section based on the date type */

  const {
    endingDate,
    endingTime,
    multipleDays,
    recurring,
    repeat,
    startingDate,
    startingTime
  } = data

  // Handle multipleDays
  if (multipleDays) {
    return `every ${formatDaysAndHours(data.days)}`
  }

  // Handle recurring
  if (repeat) {
    const {
      days,
      every,
      type
    } = recurring

    switch (type) {
      case 'day':
        return `
          starting from ${formatDate(startingDate)},
          every ${every} day${every > 1 ? 's' : ''}
          between ${startingTime} - ${endingTime}`
      case 'week':
        return `
          starting from ${formatDate(startingDate)},
          every ${every} week${every > 1 ? 's' : ''}
          on ${getDaysNames(days)}
          between ${startingTime} - ${endingTime}
        `
    }
  }

  if (endingDate.getFullYear() - startingDate.getFullYear() > 5) {
    return `from ${formatDate(startingDate)}, ${startingTime} until further notice`
  }

  return `from ${formatDate(startingDate)}, ${startingTime} until ${formatDate(endingDate)}, ${endingTime}`
}

function formatDaysAndHours (days) {
  return days.reduce((str, day, index) => {
    const only = (index === 0) && !days[index + 1]
    const last = !days[index + 1]
    const lastNext = !days[index + 2]

    return str += `
      ${(last && !only) ? 'and ' : ''}
      ${day.day} (${day.startingTime} - ${day.endingTime})${(last || lastNext) ? '' : ', '}`
  }, '')
}

function getDaysNames (days) {
  return days.reduce((str, day, index) => {
    const notLastItem = days[index + 1]

    return str += day + (notLastItem ? '/' : '')
  }, '')
}

export function parseStringifiedJSON (json) {
  return JSON.parse(localStorage.getItem('data'), (k, v) => {
    const date = Date.parse(v)

    if (isNaN(v) && !isNaN(date)) {
      return new Date(v)
    }

    return v
  })
}
