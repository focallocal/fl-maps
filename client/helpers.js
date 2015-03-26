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
Template.newEvent.helpers({
   categories: function() {
       return Categories.find({})
   },
    errors: function() {
        return Session.get('newEventError');
    },
    createCoords: function () {
        return Session.get("createCoords");
    }
});
Template.newEvent.rendered = function() {
    $('.datepicker').pickadate({
        format: 'dddd, dd mmm, yyyy',
        formatSubmit: 'dd/mm/yyyy',
        hiddenPrefix: '_hidden'
    });
};
Template.eventsList.helpers({
    events: function() {
        return Events.find({});
    }
});