Template.registerHelper('isCurrentUser', function(organiser){
    // var isDevEnvironment = Meteor.absoluteUrl() == "http://localhost:3000/";
    // return isDevEnvironment ? true : Meteor.user().profile.name == organiser.name;
    var user = Meteor.user();
    return Roles.userIsInRole(user._id, ['admin']) || user.profile.name == organiser.name;
});

Template.registerHelper('isUserInRole', function(userId, role) {
  return Roles.userIsInRole(userId, role);
});
