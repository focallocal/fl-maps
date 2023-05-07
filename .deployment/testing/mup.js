module.exports = {
  servers: {
    one: {
      host: '134.122.58.242',
      username: 'deploy',
      pem: './travis-ssh-key'
    }
  },
  app: {
    name: 'testing-happiness.ga',
    path: '../../.',
    docker: {
      image: 'zodern/meteor:root'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'https://fl-maps.testing-happiness.ga'
    }
  },
  mongo: {
    version: '3.6.17',
    servers: {
      one: {}
    }
  },
  proxy: {
    domains: 'fl-maps.testing-happiness.ga',
    ssl: {
      letsEncryptEmail: 'contact@focallocal.org'
    }
  }
}
