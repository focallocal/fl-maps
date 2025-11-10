import { Meteor } from 'meteor/meteor'
import { getDiscourseOrigin as getSharedDiscourseOrigin } from '/imports/both/utils/discourse'

const AVATAR_CACHE = new Map()

export const getDiscourseOrigin = getSharedDiscourseOrigin

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
    const template = await new Promise((resolve, reject) => {
      Meteor.call('Users.fetchDiscourseAvatar', { username }, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })

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
