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

Template.eventsNew.helpers({
    select2opts: function () {
        return {placeholder: 'Choose type of the event', minimumResultsForSearch: 20};
    },
    categoryOptions: function() {
        return Categories.find().map(function(cat){
            return {label:cat.name,value:cat._id}
        });
    }
});

Template.eventsNew.events({
    'click .eventsNew': function() {
        // Save();

        slidePanel.close();
    },
    'click .close': function() {
        slidePanel.close();
    }
});
Template.eventsNew.rendered = function() {
    var self = this;

    // Do some setup in here for when the panel is shown
    Session.set('eventsNew', null);

    // Setup an on close handler
    slidePanel.onClose(function() {
        // Fun stuff
    });
}
Template.eventsNew.destroyed = function() {
    // Can do some cleanup in here
}