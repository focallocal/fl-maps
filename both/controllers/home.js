HomeController = AppController.extend({
  onAfterAction: function () {
    GAnalytics.pageview("/home");
    Meta.setTitle('Welcome ');
  }
});
