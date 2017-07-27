if (Meteor.isClient) {

  FlowRouter.wait();
  var roles = Meteor.subscribe('roles');
  Tracker.autorun(function() {
    if (roles.ready()) {
      FlowRouter.initialize();
    }
  });

}

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

var adminRoutes = FlowRouter.group({
  name: 'godmodeRoutes',
  prefix: '/godmode',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      FlowRouter.go('/sign-in');
    }

    if (Roles.subscription.ready()) {
      if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        return true;
      } else {
        FlowRouter.go('/');
      }
    }
  }]
});

adminRoutes.route('/', {
  name: 'dashboard',
  action: function() {
    BlazeLayout.render('dashboardLanding');
  }
});

adminRoutes.route('/manage', {
  name: 'manage',
  action: function() {
    BlazeLayout.render('manage');
  }
});

adminRoutes.route('/categories', {
  name: 'categories',
  action: function() {
    BlazeLayout.render('categories');
  }
});

adminRoutes.route('/reported', {
  name: 'reported',
  action: function() {
    BlazeLayout.render('reported');
  }
});

adminRoutes.route('/users', {
  name: 'users',
  action: function() {
    BlazeLayout.render('users');
  }
});

adminRoutes.route('/notifications', {
  name: 'notifications',
  action: function() {
    BlazeLayout.render('notifications');
  }
});
