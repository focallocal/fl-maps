FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('appLayout', {main: 'home'});
  }
});


FlowRouter.route('/events/list', {
  name: 'calendar',
  action: function() {
    BlazeLayout.render('appLayout', {main: 'calendar'});
  }
});

FlowRouter.route('/events/new', {
  name: 'events.form',
  action: function() {
    BlazeLayout.render('appLayout', {main: 'eventsForm'});
  }
});

FlowRouter.route('/events/map', {
  name: 'events.form',
  action: function() {
    BlazeLayout.render('appLayout', {main: 'map'});
  }
});

FlowRouter.route('/events/:_id', {
  name: 'eventById',
  action: function() {
    BlazeLayout.render('appLayout', {main: 'event'});
  }
});

// Router.route('/events/list', {
//   name: 'calendar',
//   controller: 'CalendarController'
// });

// Router.route('/events/new', {
//   name: 'events.form',
//   controller: 'EventsNewController'
// });
//
// Router.route('/events/map', {
//   name: 'map',
//   controller: 'MapController'
// });
//
// Router.route('/events/:_id', {
//   name: 'event.show',
//   controller: 'EventController'
// });
