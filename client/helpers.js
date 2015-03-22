Template.registerHelper('baseUrl', function(path) {
    return !!path?Meteor.absoluteUrl(path):Meteor.absoluteUrl();
});
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('MM-DD-YYYY');
});
Template.results.helpers({
    search_results: function () {
        return Session.get('results')
    }
});
Template.newEvent.helpers({
   categories: function() {
       return Categories.find({})
   }
});