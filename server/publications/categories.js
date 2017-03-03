Meteor.publish("categories",function(){
   return Categories.find({"approved": true});
});

Meteor.publish("categories.raw", function() {
  if (Roles.userIsInRole(this.userId, ["admin"])) {
    return Categories.find({});
  } else {
    return Categories.find({"approved": true});
  }
});
