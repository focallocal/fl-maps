import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.addRole'
const createAdmin = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    id: {
      type: String
    },
    Role: {
      type: String
    }
  }).validator(),
  run ({ id, Role }) {
    if (!id) {
      throw new Meteor.Error('could not find user...')
    }
    Roles.addUsersToRoles(id, `${Role}`, Roles.GLOBAL_GROUP)
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 2, 5000, ({ allowed }, { userId, clientAddress }) => { // 2 requests every 5 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
