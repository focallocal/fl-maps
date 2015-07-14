MapController = AppController.extend({
    waitOn: function() {
        return this.subscribe('events') && this.subscribe('categories');
    },
    data: {
        events: Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}})
    },
    onAfterAction: function () {
        Meta.setTitle('Map ');
    }
});

