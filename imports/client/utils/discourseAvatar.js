import { Meteor } from 'meteor/meteor'
import { getDiscourseOrigin as getSharedDiscourseOrigin } from '/imports/both/utils/discourse'

const AVATAR_CACHE = new Map()

export const getDiscourseOrigin = getSharedDiscourseOrigin

function normalizeKey(username = '', size = 50) {
  return `${username.toLowerCase()}|${size}`
}

/**
 * Check if the avatar template is a default letter avatar (not a real image)
 * @param {string} template - The avatar template URL from Discourse
 * @returns {boolean} True if it's a letter avatar
 */
function isLetterAvatar(template) {
  if (!template) return true
  // Discourse letter avatars contain 'letter_avatar' in the path
  return template.includes('letter_avatar')
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
      Meteor.call('users.fetchDiscourseAvatar', username, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })

    // If it's a letter avatar (default), return null so Fun Emoji fallback is used
    if (isLetterAvatar(template)) {
      AVATAR_CACHE.set(cacheKey, null)
      return null
    }

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
