Template.eventConfirmReport.events({
    'click .yes-btn': function() {
        var selectedEventId = Session.get('selected');
        Meteor.call('Events.report', selectedEventId);
        GAnalytics.event("Events","report");
        Materialize.toast('Event Reported!', 4000);

        console.log(Events.find({_id: selectedEventId}).fetch()[0]);
    },
});
