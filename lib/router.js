
Router.map(function() {
    this.route('home', {
        path: '/',
        template: 'home'
    });
    this.route('events', {
        path: '/events',
        template: 'eventsList'
    });
    //this.route('admin', {
    //    path:'/admin',
    //    template: 'accountsAdmin',
    //
    //    onBeforeAction: function() {
    //        //if (Meteor.userId()) {
    //        //    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
    //        //        this.render('accountsAdmin');
    //        //    }
    //        //} else {
    //        //    this.redirect('/');
    //        //    this.next();
    //        //}
    //
    //        /*@TODO this needs to be fixed,
    //            now only checks if the usr is logged in.
    //             need to get the Meteo.user subsciption not nullable
    //             to get the name of the role
    //        */
    //
    //        if (Meteor.loggingIn()) {
    //            console.log(Meteor.user())
    //            this.render('accountsAdmin');
    //        } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
    //            console.log('redirecting');
    //            this.redirect('/');
    //        }
    //    }
    //});
});