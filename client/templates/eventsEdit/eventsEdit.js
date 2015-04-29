AutoForm.hooks({
    'events-edit-form': {
        onSuccess: function (operation, result, template) {
            slidePanel.closePanel();
            Materialize.toast('Event updated successfully!', 4000);
            Session.set("selected", result._id)
        },
        onError: function(formType, error) {
            console.error(error);
        }
    }
});

Template.eventsEdit.helpers({
    selectedEventDoc: function(){
        return Events.findOne(Session.get('selected'));
    }
});

Template.eventsEdit.rendered = function() {
    $('select').material_select();
    var selectedEvent = Events.findOne(Session.get('selected'));
    if (selectedEvent != null) {
        this.$('input[name="coordinates.lat"]').val(selectedEvent.coordinates.lat);
        this.$('input[name="coordinates.lng"]').val(selectedEvent.coordinates.lng);
    }
};

Template.eventsNew.destroyed = function() {
    // Can do some cleanup in here
};