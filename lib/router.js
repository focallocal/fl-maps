
Router.map(function() {
    this.route('home', {
        path: '/',
        template: 'home'
    });

    this.route('admin', {
        path:'/admin',
        template: 'accountsAdmin',

        onBeforeAction: function() {
            //if (Meteor.userId()) {
            //    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
            //        this.render('accountsAdmin');
            //    }
            //} else {
            //    this.redirect('/');
            //    this.next();
            //}
            if (Meteor.loggingIn()) {
                this.render('accountsAdmin');
            } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
                console.log('redirecting');
                this.redirect('/');
            }
        }
    });
});