Meteor.methods({
  'Events.insert': function (params) {
    Events.insert(params);
  },
  'Events.update': function(_id, params, options) {
    console.log(_id);
    Events.update(_id, params, options);
  }
});
