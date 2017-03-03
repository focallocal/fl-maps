Template.eventConfirmDelete.events({
    'click .yes-btn': function() {
        var selectedEventId = Session.get('selected');
        Events.remove(selectedEventId);
        GAnalytics.event("Events","delete");
        Materialize.toast('Event deleted!', 4000);
    }
});