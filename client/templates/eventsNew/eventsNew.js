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

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('select').material_select();
};
Template.eventsNew.destroyed = function() {
    // Can do some cleanup in here
};