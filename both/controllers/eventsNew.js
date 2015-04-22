EventsNewController = AppController.extend({
    waitOn: function() {
        return this.subscribe('categories');
    },
    data: {
        categories: Categories.find({})
    },
    onAfterAction: function () {
        Meta.setTitle('New event ');
    }
});
