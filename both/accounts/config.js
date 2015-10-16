AccountsTemplates.configureRoute('signIn',
    {
        layoutTemplate: 'appLayout',
        onAfterAction: function () {
            GAnalytics.pageview("/login");
            Meta.setTitle('Login ');
        }
    }
);
AccountsTemplates.configureRoute('signUp',
    {
        layoutTemplate: 'appLayout',
        onAfterAction: function () {
            GAnalytics.pageview("/signup");
            Meta.setTitle('Register ');
        }
    }
);
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});
