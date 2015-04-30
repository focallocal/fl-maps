AutoForm.hooks({
    'events-new-form': {
        onSuccess: function (operation, result, template) {
            slidePanel.closePanel();
            Materialize.toast('Event created successfully!', 4000);
            Session.set("selected", result._id)
        },
        onError: function(formType, error) {
            console.error(error);
        }
    }
});

Template.eventsNew.rendered = function() {
    var coords = Session.get('coords');
    console.log("eventsNew rendered, coords " + coords );
    if (!coords) {
        console.log("waiting for coords");
        Session.set('awaitingCoords',true);
    } else {
        console.log('coords defined');
        this.$('input[name="coordinates.lat"]').val(coords.lat);
        this.$('input[name="coordinates.lng"]').val(coords.lng);
        $('select').material_select();
    }
};
Template.eventsNew.helpers({
    coords: function() {
        return Session.get('coords');
    }
});
Template.eventsNew.destroyed = function() {
    // Can do some cleanup in here
};