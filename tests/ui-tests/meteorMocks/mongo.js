
const Mongo = {
  Collection: function () {
    return {
      attachSchema: jest.fn()  
    }
  },
}

export {
  Mongo
}
