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
    $('select').material_select();
    if (Template.currentData() != null) {
        this.$('input[name="coordinates.lat"]').val(Template.currentData().lat);
        this.$('input[name="coordinates.lng"]').val(Template.currentData().lng);
    }
};
Template.eventsNew.destroyed = function() {
    // Can do some cleanup in here
};