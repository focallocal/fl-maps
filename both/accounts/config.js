AccountsTemplates.configureRoute('signIn',
    {
        layoutTemplate: 'appLayout',
        onAfterAction: function () {
            Meta.setTitle('Login ');
        }
    }
);
AccountsTemplates.configureRoute('signUp',
    {
        layoutTemplate: 'appLayout',
        onAfterAction: function () {
            Meta.setTitle('Register ');
        }
    }
);
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});
