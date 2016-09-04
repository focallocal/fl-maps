AccountsTemplates.configure({showForgotPasswordLink:true});

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

AccountsTemplates.configureRoute('forgotPwd',
  {
    layoutTemplate: 'appLayout',
    onAfterAction: function () {
        GAnalytics.pageview("/forgot-password");
    },
    seo: {
        title: function () {
            return 'Forgot Password ';
        }
    }
}
);

AccountsTemplates.configureRoute('resetPwd',
  {
    layoutTemplate: 'appLayout',
    onAfterAction: function () {
        GAnalytics.pageview("/reset-password");
    },
    seo: {
        title: function () {
            return 'Reset Password ';
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
