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
