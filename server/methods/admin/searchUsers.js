import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'Admin.searchUsers'
const getUsers = new ValidatedMethod({
  name,
  mixins: [],
  validate: new SimpleSchema({
    profileName: {
      type: String
    }

  }).validator(),
  run ({ profileName }) {
    // Case-insensitive partial match search
    const searchRegex = { $regex: profileName, $options: 'i' };
    return Meteor.users.find({ 'profile.name': searchRegex }).fetch();
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
