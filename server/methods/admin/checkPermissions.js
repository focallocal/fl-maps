import { Roles } from 'meteor/alanning:roles'
import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.checkPermissions'
const changeRole = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({

    rolesAllowed: [String],
 
  }).validator(),
  run({rolesAllowed }) {
    const id = this.userId

    if (!id || !rolesAllowed) {
      throw new Meteor.Error('could not find user...')
    }

  let permission = Roles.userIsInRole(id, rolesAllowed, Roles.GLOBAL_GROUP);
  return permission;
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