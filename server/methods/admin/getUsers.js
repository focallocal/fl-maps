import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.getUsers'
const getUsers = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    skip: {
      type: Number
    },
    limit: {
      type: Number
    }
  }).validator(),
  run ({ skip, limit }) {
    const users = Meteor.users.find({},
      {
        skip,
        limit
      }).fetch()
    return users
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
