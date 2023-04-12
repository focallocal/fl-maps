var secret = require('./mup-secrets.json');

module.exports = {
  servers: {
    one: {
      host: '167.71.2.39',
      username: 'deploy',
      password: secret.password,
    }
  },
  app: {
    name: 'publichappinessmovement',
    path: '../../.',
    docker: {
      image: 'abernix/meteord:node-12-base'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'https://fl-maps.publichappinessmovement.com',
      MONGO_URL: secret.mongo_url,
      PORT: 8095,
    }
  },
};
