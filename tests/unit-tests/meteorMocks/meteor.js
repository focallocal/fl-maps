
const Meteor = {
  absoluteUrl: jest.fn(),
  user: jest.fn(),
  userId: jest.fn(),
  call: jest.fn(),
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
  Meteor,
}
