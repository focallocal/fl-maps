Meteor.publish('roles', function (){
  return Meteor.roles.find({});
});
