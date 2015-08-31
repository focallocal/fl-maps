Router.route('/', {
  name: 'home'
});

Router.route('/events/list', {
  name: 'calendar',
  controller: 'CalendarController'
});

Router.route('/events/new', {
  name: 'events.form',
  controller: 'EventsNewController'
});

Router.route('/events/map', {
  name: 'map',
  controller: 'MapController'
});
