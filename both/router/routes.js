FlowRouter.route('/', {
  name: 'home',
  action: function() {
    BlazeLayout.render('appLayout', {main: 'home'});
  }
});

FlowRouter.route('/sign-in', {
  name: 'signIn'
});

FlowRouter.route('/sign-up', {
  name: 'signUp'
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
  name: 'map',
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

FlowRouter.route('/godmode', {
  name: 'manageAdmins',
  action: function() {
    BlazeLayout.render('godmode');
  }
})
