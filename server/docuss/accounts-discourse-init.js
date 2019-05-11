import { ServiceConfiguration } from 'meteor/service-configuration'

ServiceConfiguration.configurations.upsert(
  { service: 'discourse' },
  {
    $set: {
      // THIS SHOULD BE PUT IN SETTINGS.JSON
      url: 'http://vps465971.ovh.net:3000/',
      // THIS SHOULD BE PUT IN SETTINGS.JSON
      secret: 'pmVEzm8cUiTi0w6AfkeDCQGUZGUfTiAl',
      oneTimeLogin: true
    }
  }
)
