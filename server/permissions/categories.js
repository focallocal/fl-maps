Categories.allow({
  'insert': function(userId, doc) {
    return userId
  },
  'update': function(userId, doc, fields, modifier) {
    console.log("ASDFWR##@WE");
    return userId;
  }
});
