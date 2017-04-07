Template.eventConfirmReport.events({
    'click .yes-btn': function() {

        if (Meteor.user() === null) {
          Materialize.toast("You must be logged in!", 4000);
          return;
        }
        var selectedEventId = Session.get('selected');
        var userId = Meteor.user()._id;

        Meteor.call('Events.report', selectedEventId, userId, function(error, result) {
            Materialize.toast(result, 4000);
        });

        GAnalytics.event("Events","report");
    },
});
