import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.deleteUser'
const createAdmin = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    id: {
      type: String
    }
  }).validator(),
  run ({ id }) {
    if (!id) {
      throw new Meteor.Error('could not find user...')
    }
    Meteor.users.remove({ _id: id })
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 5, 5000, ({ allowed }, { userId, clientAddress }) => { // 5 requests every 5 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
