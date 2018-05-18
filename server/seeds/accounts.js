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

  // Twitter
  ServiceConfiguration.configurations.upsert(
    { service: 'twitter' },
    {
      $set: {
        'consumerKey': settings.twitter.oauth_key,
        'secret': settings.twitter.oauth_secret,
        'loginStyle': 'popup'
      }
    }
  )
}

Accounts.onCreateUser(function (options, user) {
  if (options.profile) user.profile = options.profile
  if (options.email) user.profile = {'name': options.email}

  return user
})
