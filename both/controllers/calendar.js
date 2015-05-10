CalendarController = AppController.extend({
  waitOn: function() {
    return this.subscribe('events');
  },
  data: {
    eventsList: Events.find({})
  },
  onAfterAction: function () {
    Meta.setTitle('Calendar');
  }
});
