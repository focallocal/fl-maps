import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.changeRole'
const changeRole = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    id: {
      type: String
    },
    role: {
      type: String
    }
  }).validator(),
  run ({ id, role }) {
    if (!id) {
      throw new Meteor.Error('could not find user...')
    }

    Roles.setUserRoles(id, `${role}`, Roles.GLOBAL_GROUP)
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 4, 5000, ({ allowed }, { userId, clientAddress }) => { // 4 requests every 5 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
