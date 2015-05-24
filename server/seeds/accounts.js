function createServiceConfiguration(service, clientId, secret) {
    ServiceConfiguration.configurations.upsert(
        {"service": service},
        {
            $set: {
                "clientId": clientId,
                "secret": secret,
                "loginStyle": "popup"
            }
        });
}

Meteor.startup(function() {
    var settings = Meteor.settings[process.env.NODE_ENV];
    console.log("Node.js environment: "+process.env.NODE_ENV);
    console.log("settings: " + settings);
    console.log("settings type: " + typeof settings);
    if (settings!=undefined) {
        console.log("Loading tokens...") ;
        createServiceConfiguration("google", settings.google.oauth_key, settings.google.oauth_secret);
        createServiceConfiguration("meetup", settings.meetup.oauth_key, settings.meetup.oauth_secret);
        //createServiceConfiguration("facebook", settings.facebook.oauth_key, settings.facebook.oauth_secret);
        //createServiceConfiguration("twitter", settings.twitter.oauth_key, settings.twitter.oauth_secret);
        ServiceConfiguration.configurations.upsert(
            {"service": "twitter"},
            {
                $set: {
                    "consumerKey": settings.twitter.oauth_key,
                    "secret": settings.twitter.oauth_secret,
                    "loginStyle": "popup"
                }
            });
        ServiceConfiguration.configurations.upsert(
            {"service": "facebook"},
            {
                $set: {
                    "appId": settings.facebook.oauth_key,
                    "secret": settings.facebook.oauth_secret,
                    "loginStyle": "popup"
                }
            });
    }
});

Accounts.onCreateUser(function(options, user) {
    if (options.profile) user.profile = options.profile;
    if (options.email) user.profile = {"name" : options.email};
    return user;
});