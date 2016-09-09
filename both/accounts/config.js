AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/sign-in',
    template: 'fullPageAtForm',
    layoutTemplate: 'appLayout',
    contentRegion: 'main'
});
AccountsTemplates.configureRoute('signUp',
    {
      name: 'signin',
      path: '/sign-up',
      template: 'fullPageAtForm',
      layoutTemplate: 'appLayout',
      contentRegion: 'main'
    }
);
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});
