import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import crypto from 'crypto'

Meteor.methods({
  'users.getGravatarUrl' (userId) {
    check(userId, String)
    
    const user = Meteor.users.findOne(userId)
    if (!user || !user.emails || !user.emails[0]) {
      return null
    }
    
    const email = user.emails[0].address.trim().toLowerCase()
    const hash = crypto.createHash('md5').update(email).digest('hex')
    
    return `https://s.gravatar.com/avatar/${hash}?s=50`
  }
})
