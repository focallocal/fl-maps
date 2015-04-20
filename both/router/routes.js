Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/items/new', {
  name: 'items.new'
});

Router.route('/map', {
  name: 'map'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
