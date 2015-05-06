CalendarController = AppController.extend({
  waitOn: function() {
    return this.subscribe('events');
  },
  data: {
    events: Events.find({})
  },
  onAfterAction: function () {
    Meta.setTitle('Calendar');
  }
});
