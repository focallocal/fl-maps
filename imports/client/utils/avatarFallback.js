/**
 * Avatar Fallback Utility
 * 
 * Provides Notionists avatars as fallback when Discourse avatar is not available.
 * 
 * Flow:
 * 1. Discourse Avatar (includes Gravatar via Discourse settings) - handled by discourseAvatar.js
 * 2. DiceBear Notionists (this file) - final fallback for users without custom avatars
 * 
 * Uses DiceBear's notionists style: https://www.dicebear.com/styles/notionists/
 * These are fun, hand-drawn style avatars.
 */

/**
 * Generate a DiceBear Notionists avatar URL
 * Same identifier always generates the same avatar (deterministic)
 * @param {string} identifier - Username or any string to seed the avatar
 * @param {number} size - Size in pixels (default 90)
 * @returns {string} URL to the avatar SVG
 */
export function getNotionistsAvatar(identifier, size = 90) {
  const seed = (identifier || 'anonymous').toString().trim().toLowerCase()
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&size=${size}`
}

// Keep old function name for backwards compatibility
export function getFunEmojiAvatar(identifier, size = 90) {
  return getNotionistsAvatar(identifier, size)
}

/**
 * Get fallback avatar (Fun Emoji)
 * Use when Discourse avatar is not available
 * @param {string} identifier - Username or name
 * @param {number} size - Size in pixels
 * @returns {string} Fun Emoji avatar URL
 */
export function getFallbackAvatar(identifier, size = 90) {
  return getFunEmojiAvatar(identifier, size)
}

/**
 * Async version for compatibility with existing code
 * Simply returns the Fun Emoji URL (no async needed, but kept for API compatibility)
 * @param {string} identifier - Username or name
 * @param {number} size - Size in pixels
 * @returns {Promise<string>} Fun Emoji avatar URL
 */
export async function getFallbackAvatarAsync(identifier, size = 90) {
  return getFunEmojiAvatar(identifier, size)
}

/**
 * Sync version - alias for getFunEmojiAvatar
 * @param {string} identifier - Username or name
 * @param {number} size - Size in pixels
 * @returns {string} Fun Emoji avatar URL
 */
export function getFallbackAvatarSync(identifier, size = 90) {
  return getFunEmojiAvatar(identifier, size)
}
