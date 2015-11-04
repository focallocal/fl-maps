EventsNewController = AppController.extend({
    waitOn: function() {
        return this.subscribe('categories');
    },
    data: {
        isEdit: false,
        categories: Categories.find({})
    },
    onAfterAction: function () {
        GAnalytics.pageview("/new_event");
    },
    seo: {
    title: function () {
        return 'New event ';
    }
}
});
