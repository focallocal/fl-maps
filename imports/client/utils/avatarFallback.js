/**
 * Avatar Fallback Utility
 * 
 * Provides a fallback chain for user avatars:
 * 1. Discourse Avatar (handled separately)
 * 2. Gravatar (if user has a real image uploaded)
 * 3. DiceBear Fun Emoji (final fallback - deterministic based on username)
 */

const crypto = require('crypto')

/**
 * Generate a DiceBear Fun Emoji avatar URL
 * These are fun, colorful emoji-style faces that avoid demographic concerns
 * @param {string} identifier - Username or any string to seed the avatar
 * @param {number} size - Size in pixels
 * @returns {string} URL to the avatar SVG
 */
export function getFunEmojiAvatar(identifier, size = 90) {
  const seed = (identifier || 'anonymous').toString().trim().toLowerCase()
  return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(seed)}&size=${size}`
}

/**
 * Generate a Gravatar URL with 404 fallback
 * @param {string} identifier - Email or username
 * @param {number} size - Size in pixels
 * @returns {string} Gravatar URL that returns 404 if no image exists
 */
export function getGravatarUrl(identifier, size = 90) {
  const hash = crypto.createHash('md5').update(identifier.toLowerCase().trim()).digest('hex')
  return `https://s.gravatar.com/avatar/${hash}?s=${size}&d=404`
}

/**
 * Check if a Gravatar exists for the given identifier
 * @param {string} identifier - Email or username
 * @param {number} size - Size in pixels
 * @returns {Promise<string|null>} Gravatar URL if exists, null otherwise
 */
export async function checkGravatar(identifier, size = 90) {
  const url = getGravatarUrl(identifier, size)
  try {
    const response = await fetch(url, { method: 'HEAD' })
    if (response.ok) {
      return url
    }
    return null
  } catch (error) {
    // Network error or CORS issue - assume no Gravatar
    return null
  }
}

/**
 * Get the best available fallback avatar (Gravatar or Fun Emoji)
 * Call this when Discourse avatar is not available
 * @param {string} identifier - Username or email
 * @param {number} size - Size in pixels
 * @returns {Promise<string>} URL to the best available avatar
 */
export async function getFallbackAvatarAsync(identifier, size = 90) {
  // Try Gravatar first
  const gravatarUrl = await checkGravatar(identifier, size)
  if (gravatarUrl) {
    return gravatarUrl
  }
  
  // Fall back to Fun Emoji
  return getFunEmojiAvatar(identifier, size)
}

/**
 * Get a synchronous fallback avatar (Fun Emoji only)
 * Use this when you can't await, or as the final fallback
 * @param {string} identifier - Username or any string
 * @param {number} size - Size in pixels
 * @returns {string} URL to Fun Emoji avatar
 */
export function getFallbackAvatarSync(identifier, size = 90) {
  return getFunEmojiAvatar(identifier, size)
}
