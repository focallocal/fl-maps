import { Meteor } from 'meteor/meteor'

const AVATAR_CACHE = new Map()

const DEFAULT_DISCOURSE_ORIGIN = 'https://publichappinessmovement.com'

function resolveSettingOrigin() {
  if (typeof Meteor === 'undefined') {
    return null
  }

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

export function getDiscourseOrigin() {
  if (typeof window !== 'undefined') {
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

function normalizeKey(username = '', size = 50) {
  return `${username.toLowerCase()}|${size}`
}

export function buildAvatarUrl(template, size = 50) {
  if (!template) {
    return null
  }

  const sizeStr = String(size)
  let url = template.includes('{size}') ? template.replace('{size}', sizeStr) : template

  if (url.startsWith('//')) {
    return `https:${url}`
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  const origin = getDiscourseOrigin()
  return `${origin}${url}`
}

export async function getDiscourseAvatarUrl(username, size = 50) {
  if (!username) {
    return null
  }

  const cacheKey = normalizeKey(username, size)
  if (AVATAR_CACHE.has(cacheKey)) {
    return AVATAR_CACHE.get(cacheKey)
  }

  try {
    const origin = getDiscourseOrigin()
    const response = await fetch(`${origin}/u/${encodeURIComponent(username)}.json`, {
      credentials: 'include',
      mode: 'cors'
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    const template = data?.user?.avatar_template
    const resolved = buildAvatarUrl(template, size)

    AVATAR_CACHE.set(cacheKey, resolved)
    return resolved
  } catch (error) {
    console.warn('[discourseAvatar] Failed to resolve avatar for', username, error)
    AVATAR_CACHE.set(cacheKey, null)
    return null
  }
}

export function clearAvatarCache() {
  AVATAR_CACHE.clear()
}
