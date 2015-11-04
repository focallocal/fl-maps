AccountsTemplates.configureRoute('signIn',
    {
        layoutTemplate: 'appLayout',
        onAfterAction: function () {
            GAnalytics.pageview("/login");
        },
        seo: {
            title: function () {
                return 'Login ';
            }
        }
    }
);
AccountsTemplates.configureRoute('signUp',
    {
        layoutTemplate: 'appLayout',
        onAfterAction: function () {
            GAnalytics.pageview("/signup");
        },
        seo: {
            title: function () {
                return 'Register ';
            }
        }
    }
);
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});
