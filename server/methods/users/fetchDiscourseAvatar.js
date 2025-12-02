import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { check } from 'meteor/check'
import { getDiscourseOrigin } from '/imports/both/utils/discourse'

Meteor.methods({
  'users.fetchDiscourseAvatar' (input) {
    const username = typeof input === 'string' ? input : input?.username
    if (typeof username !== 'string' || username.trim() === '') {
      throw new Meteor.Error('bad-request', 'Username is required')
    }
    check(username, String)

    const origin = getDiscourseOrigin()
    const endpoint = `${origin}/u/${encodeURIComponent(username)}.json`

    try {
      const response = HTTP.get(endpoint, { timeout: 5000 })
      const data = response.data
      const template = data?.user?.avatar_template || null
      return template
    } catch (error) {
      throw new Meteor.Error('avatar-fetch-failed', error?.message || 'Failed to fetch Discourse avatar')
    }
  }
})