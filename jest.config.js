module.exports = {
  setupFiles: ['<rootDir>/tests/unit-tests/testsSetup.js'],
  moduleNameMapper: {
    '^meteor/mdg:validated-method': '<rootDir>/tests/unit-tests/meteorMocks/validated-method.js',
    '^meteor/meteoreact:accounts': '<rootDir>/tests/unit-tests/meteorMocks/accounts.js',
    '^meteor/alanning:roles': '<rootDir>/tests/unit-tests/meteorMocks/roles.js',
    '^meteor/(.*)': '<rootDir>/tests/unit-tests/meteorMocks/$1',
    '^/imports/(.*)': '<rootDir>/imports/$1',
    '^/server/(.*)': '<rootDir>/server/$1',
    '^/tests/(.*)': '<rootDir>/tests/$1',
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  },
  roots: [
    '<rootDir>/imports',
    '<rootDir>/server'
  ]
}
