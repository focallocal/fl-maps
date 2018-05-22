
const Meteor = {
  user: jest.fn(),
  userId: jest.fn(),
  settings: {
    public: {
      gm: {
        key: ''
      }
    }
  }
}

export {
  Meteor as default,
  Meteor
}
