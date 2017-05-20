Events.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId && doc.organiser._id === userId || Roles.userIsInRole(userId, ['admin']);
  },
  'remove': function(userId, doc) {
    return userId && doc.organiser._id === userId || Roles.userIsInRole(userId, ['admin']);
  }
});
