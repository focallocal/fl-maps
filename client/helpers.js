// global helpers
Template.registerHelper('baseUrl', function(path) {
    return !!path?Meteor.absoluteUrl(path):Meteor.absoluteUrl();
});
Template.eventsList.helpers({
    formatDate: function (date) {
        return moment(date).format("dddd, MMMM Do YYYY");
    },
    fromNowDate: function (date) {
        return moment(date).fromNow();
    }
});

// per template helpers
Template.results.helpers({
    search_results: function () {
        return Session.get('results')
    }
});
Template.newEvent.helpers({
   categories: function() {
       return Categories.find({})
   },
    errors: function() {
        return Session.get('newEventError');
    }
});
Template.newEvent.rendered = function() {
    $('.datepicker').pickadate();
};