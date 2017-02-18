Template.eventConfirmReport.events({
    'click .yes-btn': function() {
        var selectedEventId = Session.get('selected');
        var event = Events.find({_id: selectedEventId}).fetch()[0];
        var number = event.report;

        if (number) {
            number = number.number || 0;
        }

        var report = {
            status: true,
            admin_overwrite: false,
            number: number + 1
        };

        Meteor.call('Events.update', selectedEventId, {
            '$set': {
                'report': report
            }}, {
                validate: false
            });

        GAnalytics.event("Events","report");
        Materialize.toast('Event Reported!', 4000);
    },
});
