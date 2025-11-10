import { Meteor } from 'meteor/meteor'

const DEFAULT_DISCOURSE_ORIGIN = 'https://publichappinessmovement.com'

function resolveSettingOrigin () {
  const publicSettings = Meteor?.settings?.public || {}
  return (
    publicSettings.discourseOrigin ||
    publicSettings.discourse_url ||
    publicSettings.discourseUrl ||
    publicSettings.discourse?.origin ||
    publicSettings.discourse?.url ||
    null
  )
}

export function getDiscourseOrigin () {
  if (Meteor.isClient && typeof window !== 'undefined') {
    const fromWindow = window['__DISCOURSE_ORIGIN'] || window['__docussDiscourseOrigin']
    if (fromWindow) {
      return fromWindow
    }
  }

  const fromSettings = resolveSettingOrigin()
  if (fromSettings) {
    return fromSettings
  }

  return DEFAULT_DISCOURSE_ORIGIN
}
