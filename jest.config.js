module.exports = {
  setupFiles: ["<rootDir>/tests/ui-tests/testsSetup.js"],
  moduleNameMapper: {
    '^meteor/(.*)': '<rootDir>/tests/ui-tests/meteorMocks/$1',
    '^/imports/(.*)': '<rootDir>/imports/$1',
    "^.+\\.(css|scss)$": "identity-obj-proxy"
  }
}
