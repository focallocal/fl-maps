module.exports = {
  setupFiles: ['<rootDir>/tests/unit-tests/testsSetup.js'],
  moduleNameMapper: {
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
