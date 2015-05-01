MapController = AppController.extend({
    waitOn: function() {
        return this.subscribe('events');
    },
    data: {
        events: Events.find({dateEvent: {$gte:new Date()}})
    },
    onAfterAction: function () {
        Meta.setTitle('Map ');
    }
});

