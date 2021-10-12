var secret = require('./mup-secrets.json');

module.exports = {
  servers: {
    one: {
      host: 'localhost',
      username: 'townson',
      password: 'townson',
    }
  },
  app: {
    name: 'brightertomorrowmap',
    path: '../../.',
    docker: {
      image: 'abernix/meteord:node-8.4.0-base'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'https://fl-maps.brightertomorrowmap.com',
      MONGO_URL: secret.mongo_url,
    }
  },
  proxy: {
    domains: 'fl-maps.brightertomorrowmap.com',
    shared: {
      httpPort: 80,
      httpsPort: 443
    },
    ssl: {
      letsEncryptEmail: 'contact@focallocal.org',
      forceSSL: true
    }
  }
};
