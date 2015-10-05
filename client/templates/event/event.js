Template.event.helpers({
    eventId: function () {
        var controller = Iron.controller();
        // reactively return the value of eventId
        return controller.state.get('eventId');
    }

});

Template.event.events({
    'click #go-back-btn': function() {
        history.back();
    }
});

Template.event.rendered = function() {
    var initializeTabs = function initializeTabs() {
        $('ul.tabs').tabs();
    };
    initializeTabs();
};
