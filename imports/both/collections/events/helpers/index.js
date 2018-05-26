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
  defaultValue: getDate(1),
  optional: true
}

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function getHour (hours) {
  let date = new Date()

  if (hours) {
    date.setHours(date.getHours() + hours)
  }

  if (date.toLocaleTimeString) {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })
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
