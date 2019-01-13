module.exports = {
  servers: {
    one: {
      host: '104.238.186.173',
      username: 'deploy',
      pem: 'id_rsa_focal_deploy'
    }
  },
  app: {
    name: 'fl-maps',
    path: './',
    docker: {
      image: 'mup-focallocal:latest'
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'http://focallocal.org',
      MONGO_URL: 'mongodb://localhost/meteor'
    }
  },
  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
