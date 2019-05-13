//------------------------------------------------------------------------------

import { ServiceConfiguration } from 'meteor/service-configuration'

ServiceConfiguration.configurations.upsert(
  { service: 'discourse' },
  {
    $set: {
      url: Meteor.settings.private.discourse.url,
      secret: Meteor.settings.private.discourse.secret,
      oneTimeLogin: true
    }
  }
)

//------------------------------------------------------------------------------

// Even though you should never use the `profile` field of Meteor.users (see 
// https://guide.meteor.com/accounts.html#dont-use-profile), fl-maps does. This
// might be fixed in the future. In the meantime, create a "profile" field using
// the pattern described here:
// https://github.com/sylque/accounts-discourse#field-added-to-meteorusers

import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

// Add an additional service-agnostic "name" field
Accounts.onLogin(data => {
  if (data.type === 'discourse') {
    const discourse = data.user.services.discourse
    const name = discourse.name || discourse.username
    Meteor.users.update(data.user._id, { $set: { profile: { name } } })
  }
})

//------------------------------------------------------------------------------
