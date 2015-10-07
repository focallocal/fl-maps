// Bandaid for AutoForm not removing array elements, GitBug @ https://goo.gl/SBijNR
Template.afArrayField_sociallinks.events({
    'click .autoform-remove-item': function (e) {
        // SO Thread @ https://goo.gl/uY0R2U discussing how to remove specific element
        // * Can't use $unset >> $pull as $pull doesn't seem to work with minimongo
        var eventId = e.currentTarget.form.dataset.eventId;
        var event = Events.findOne(eventId);
        delete event._id;                     // Minimongo doesn't like to update _id
        event.links.splice(this.index, 1);    // Get rid of indexed array element
        Events.update({_id:eventId}, {$set: event});
    }
});

