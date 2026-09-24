// @ts-nocheck
import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

/**
 * Fetches the latest videos from a public YouTube playlist using YouTube's
 * public Atom feed (no API key required, no npm dependency needed).
 * Feed docs: https://www.youtube.com/feeds/videos.xml?playlist_id=PLAYLIST_ID
 */

// Decode the handful of HTML/XML entities that show up in YouTube feed titles
const decodeEntities = (text = '') => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
}

Meteor.methods({
  /**
   * Get the latest videos from a public YouTube playlist
   */
  'Youtube.getLatestVideos'({ playlistId, limit = 6 } = {}) {
    if (!playlistId) {
      return []
    }

    const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`

    let xml
    try {
      const response = HTTP.get(url, { timeout: 10000 })
      xml = response.content
    } catch (error) {
      console.error('[Youtube API] Error fetching playlist feed:', error.message)
      return []
    }

    if (!xml) {
      return []
    }

    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || []

    return entries.slice(0, limit).map(entry => {
      const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) || [])[1]
      const title = decodeEntities((entry.match(/<title>(.*?)<\/title>/) || [])[1] || '')

      return {
        videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`
      }
    }).filter(video => video.videoId)
  }
})
