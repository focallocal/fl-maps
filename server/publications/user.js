import { Meteor } from 'meteor/meteor'

Meteor.publish('users.user', function () {
  if (this.userId) {
    return Meteor.users.find({
      _id: this.userId
    }, {
      fields: {
        'profile': 1,
        'attendance': 1
      }
    })
  } else {
    return this.ready()
  }
})
