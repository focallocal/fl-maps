/* globals ServiceConfiguration: 1 */
import { Meteor } from 'meteor/meteor'
/*
  Set up oAuth for Google, Facebook and Twitter
*/

var settings = Meteor.settings[process.env.NODE_ENV]
if (settings !== undefined) {
  // Google
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        'loginStyle': 'popup',
        'clientId': settings.google.oauth_key,
        'secret': settings.google.oauth_secret
      }
    }
  )

  // Facebook
  ServiceConfiguration.configurations.upsert(
    {'service': 'facebook'},
    {
      $set: {
        'appId': settings.facebook.oauth_key,
        'secret': settings.facebook.oauth_secret,
        'loginStyle': 'popup'
      }
    }
  )
}

Accounts.onCreateUser(function (options, user) {
  if (options.profile) user.profile = options.profile

  if (!options.email) {
    const details = getDetailsFromService(user.services)
    user.profile = details
  } else {
    user.profile = {'name': options.email}
  }

  // Set defaults
  user.attendance = []

  return user
})

function getDetailsFromService (services) {
  const serviceName = services.google ? 'google' : 'facebook'
  const service = services[serviceName]

  return {
    name: service.name,
    picture: service.picture
  }
}
