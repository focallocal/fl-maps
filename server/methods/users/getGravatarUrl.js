import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import crypto from 'crypto'

Meteor.methods({
  'users.getGravatarUrl' (userId) {
    check(userId, String)
    
    console.log('[getGravatarUrl] Called with userId:', userId)
    
    const user = Meteor.users.findOne(userId)
    console.log('[getGravatarUrl] User found:', !!user)
    
    if (!user || !user.emails || !user.emails[0]) {
      console.log('[getGravatarUrl] No user or email found')
      return null
    }
    
    const email = user.emails[0].address.trim().toLowerCase()
    console.log('[getGravatarUrl] Email:', email)
    
    const hash = crypto.createHash('md5').update(email).digest('hex')
    const gravatarUrl = `https://s.gravatar.com/avatar/${hash}?s=50`
    
    console.log('[getGravatarUrl] Generated URL:', gravatarUrl)
    
    return gravatarUrl
  }
})
