Template.registerHelper('isCurrentUser', function(organiser){
    return Meteor.user().profile.name==organiser;
});