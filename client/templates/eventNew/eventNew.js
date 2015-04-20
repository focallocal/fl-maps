AutoForm.hooks({
    'events-new-form': {
        onSuccess: function (operation, result, template) {
            slidePanel.close();
            toast('Event created successfully!', 4000);
            //Router.go('map');
            console.log(operation);
            console.log(result);
            //Session.set("selected", event._id)
        }
    }
});

Template.eventNew.events({
    'click .eventNew': function() {
        // Save();

        slidePanel.close();
    },
    'click .close': function() {
        slidePanel.close();
    }
});
Template.eventNew.rendered = function() {
    var self = this;

    // Do some setup in here for when the panel is shown
    Session.set('eventNew', null);

    // Setup an on close handler
    slidePanel.onClose(function() {
        // Fun stuff
    });
}
Template.eventNew.destroyed = function() {
    // Can do some cleanup in here
}