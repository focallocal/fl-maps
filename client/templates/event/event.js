Template.event.onCreated(function() {
    this.subscribe('events');
});

Template.event.helpers({
    selectedEvent: function () {
        const eventId = FlowRouter.current().params._id;
        const event = Events.find({_id: eventId}).fetch()[0];
        return event;
    }

});

Template.event.events({
    'click #go-back-btn': function() {
        history.back();
    }
});
