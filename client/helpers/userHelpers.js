Template.registerHelper('isCurrentUser', function(organiser){
    var isDevEnvironment = Meteor.absoluteUrl() === "http://localhost:3000/";
    return isDevEnvironment ? true : Meteor.user().profile.name == organiser;
});