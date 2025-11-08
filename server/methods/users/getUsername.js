import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  'users.getUsername' (userId) {
    check(userId, String)

    const user = Meteor.users.findOne(userId)
    if (!user) {
      return null
    }

    return user.username || null
  }
})
