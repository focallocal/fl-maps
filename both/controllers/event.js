EventController = AppController.extend({
  action: function () {
    // set the reactive state variable "postId" with a value
    // of the id from our url
    this.state.set('eventId', this.params._id);
    this.render();
  },
  template: 'Event',
  waitOn: function() {
    return this.subscribe('events',this.params._id);
  },
  data:  function() {
    var event = Events.findOne(this.params._id);
    if (event) {
      return event;
    }
  },
  onAfterAction: function () {
    Meta.setTitle('Event ' + this.data.name);
  }
});
