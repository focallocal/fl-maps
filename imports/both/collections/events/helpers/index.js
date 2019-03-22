import possibleEventHours from './possibleEventHours'

export const startingTime = {
  type: String,
  allowedValues: possibleEventHours,
  uniforms: {
    'customType': 'select',
    'label': ' '
  }
}

export const endingTime = {
  type: String,
  allowedValues: possibleEventHours,
  uniforms: {
    'customType': 'select',
    'label': ' '
  }
}

export const startingDate = {
  type: Date,
  defaultValue: getDate(),
  optional: true
}

export const endingDate = {
  type: Date,
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

export function getDate (hours) {
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

export const videoHosts = [
  { host: 'Youtube', prefix: 'https://www.youtube.com/watch?v=' },
  { host: 'Facebook', prefix: 'https://www.facebook.com/facebook/videos/' },
  // { host: 'Soundcloud', prefix: '' }, <-- currently disabled as this is audio only
  { host: 'Streamable', prefix: 'https://streamable.com/' },
  { host: 'Vimeo', prefix: 'https://vimeo.com/' },
  { host: 'Wistia', prefix: 'https://home.wistia.com/medias/' },
  { host: 'Twitch', prefix: 'https://www.twitch.tv/videos/' },
  { host: 'DailyMotion', prefix: 'https://www.dailymotion.com/video/' },
  { host: 'Direct Link - mp4/ogv/webm/m3u8/mpd', prefix: '' }
]
