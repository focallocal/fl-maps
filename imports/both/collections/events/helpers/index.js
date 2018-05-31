import possibleEventHours from './possibleEventHours'

export const startingTime = {
  type: String,
  allowedValues: possibleEventHours,
  uniforms: {
    'customType': 'select',
    'label': 'From'
  }
}

export const endingTime = {
  type: String,
  allowedValues: possibleEventHours,
  uniforms: {
    'customType': 'select',
    'label': 'Until'
  }
}

export const startingDate = {
  type: Date,
  defaultValue: getDate(),
  optional: true
}

export const endingDate = {
  type: Date,
  defaultValue: getDate(3),
  optional: true
}

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function getHour (hours, date = new Date()) {
  if (hours) {
    date.setHours(date.getHours() + hours)
  }

  if (date.toLocaleTimeString) {
    const time = date.toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })
    const values = time.split(':')

    if (values[1] >= 30) {
      return date.getHours() + ':' + '30'
    } else {
      return date.getHours() + ':' + '00'
    }
  }

  return '15:00'
}

function getDate (hours) {
  let date = new Date()

  if (hours) {
    date.setHours(date.getHours() + hours)
  }

  return date
}

export function determinePosition (month) {
  /*
    When setting a recurring date to repeat every month
    Use this function to determine which position a day is in the month (1st, 2nd, 3rd, 4th)
  */

  let position

  if (month <= 7) {
    position = '1st'
  } else if (month > 7 && month <= 14) {
    position = '2nd'
  } else if (month > 14 && month <= 21) {
    position = '3rd'
  } else {
    position = '4th'
  }

  return position
}
