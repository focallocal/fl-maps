EventsNewController = AppController.extend({
    waitOn: function() {
        return this.subscribe('categories');
    },
    data: {
        isEdit: false,
        categories: Categories.find({})
    },
    onAfterAction: function () {
        Meta.setTitle('New event ');
    }
});
