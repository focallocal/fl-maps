HomeController = AppController.extend({
  onAfterAction: function () {
    GAnalytics.pageview("/home");
  },
  seo: {
    title: function () {
      return 'Welcome  ';
    }
  }
});
