CalendarController = AppController.extend({
  waitOn: function() {
    return this.subscribe('events');
  },
  data: {
    upcomingEvents: Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}}, {sort: {dateEvent: 1}}),
    pastEvents: Events.find({dateEvent: {$lt:moment().startOf('day').toDate()}}, {sort: {dateEvent: -1}})
  },
  onAfterAction: function () {
    Meta.setTitle('Calendar');
  }
});
