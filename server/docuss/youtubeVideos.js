// @ts-nocheck
import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

/**
 * Fetches the latest videos from a public YouTube playlist using the
 * official YouTube Data API v3 (requires a free API key from Google
 * Cloud Console, stored in Meteor.settings.private.youtube.apiKey).
 *
 * Note: YouTube's legacy public Atom feed (/feeds/videos.xml) has been
 * discontinued and now returns 404 for all channels/playlists, so the
 * official API is the only reliable option.
 */

Meteor.methods({
  /**
   * Get the latest videos from a public YouTube playlist, sorted by
   * publish date (most recent first).
   */
  'Youtube.getLatestVideos'({ playlistId, limit = 6 } = {}) {
    if (!playlistId) {
      return []
    }

    const apiKey = Meteor.settings?.private?.youtube?.apiKey
    if (!apiKey) {
      console.error('[Youtube API] Missing Meteor.settings.private.youtube.apiKey')
      return []
    }

    const url = 'https://www.googleapis.com/youtube/v3/playlistItems'

    let data
    try {
      const response = HTTP.get(url, {
        timeout: 10000,
        params: {
          part: 'snippet',
          playlistId,
          maxResults: 50,
          key: apiKey
        }
      })
      data = response.data
    } catch (error) {
      console.error('[Youtube API] Error fetching playlist items:', error.message)
      return []
    }

    if (!data || !Array.isArray(data.items)) {
      return []
    }

    return data.items
      .filter(item => item.snippet?.resourceId?.videoId)
      .sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt))
      .slice(0, limit)
      .map(item => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title
      }))
  }
})
