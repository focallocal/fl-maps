Template.event.helpers({
    eventId: function () {
        var controller = Iron.controller();
        // reactively return the value of eventId
        return controller.state.get('eventId');
    }

});