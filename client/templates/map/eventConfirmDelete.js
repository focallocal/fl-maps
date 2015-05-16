Template.eventConfirmDelete.events({
    'click .yes-btn': function() {
        var selectedEventId = Session.get('selected');
        Events.remove(selectedEventId);
        Materialize.toast('Event deleted!', 4000);
    }
});