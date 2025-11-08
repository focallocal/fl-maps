import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  'users.getUsername' (userId) {
    check(userId, String)

    console.log('[getUsername] Called with userId:', userId)

    const user = Meteor.users.findOne(userId)
    console.log('[getUsername] User found:', !!user, 'Username:', user?.username)
    
    if (!user) {
      return null
    }

    return user.username || null
  }
})
