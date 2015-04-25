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
    var self = this;
    //this.$('#event-return-button').click(function(){
    //    slidePanel.closePanel();
    //});
    // Do some setup in here for when the panel is shown
    Session.set('eventsNew', null);

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('select').material_select();
    if (Template.currentData() != null) {
        this.$('input[name="coordinates.lat"]').val(Template.currentData().lat);
        this.$('input[name="coordinates.lng"]').val(Template.currentData().lng);
    }
    this.$('div.card-panel.autoform-object-field').hide();
};
Template.eventsNew.destroyed = function() {
    // Can do some cleanup in here
};