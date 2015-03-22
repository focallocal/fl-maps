
switch (process.env.ROOT_URL) {
    case "http://localhost:3000/":
        process.env.MEETUP_CLIENT_ID = "38k5c02dj52h5mga9k321ud3uq";
        process.env.MEETUP_SECRET = "s9b2b3tdk6dmfng9vsmuqi5jjj";
        break;
    case "http://focallocal.meteor.com/":
        process.env.MEETUP_CLIENT_ID = "r2p02hica9uktu1uqpk1d184o9";
        process.env.MEETUP_SECRET = "i7605716jmpbef8o2kumlo70cj";
        break;
}

ServiceConfiguration.configurations.upsert(
    {"service": "facebook"},
    {
        $set: {
            "appId": "392906830890754",
            "secret": "bebe3ceb92be8ec14a363ff325af9a49",
            "loginStyle": "popup"
        }
    });

ServiceConfiguration.configurations.upsert(
    {"service": "google"},
    {
        $set: {
            "clientId": "999855433817-0n06f7rotm4nq1lkdeq7850fde2cin7h.apps.googleusercontent.com",
            "secret": "nOOTfPCRL8SnntlE6tUeEam8",
            "loginStyle": "popup"
        }
    });


ServiceConfiguration.configurations.upsert(
    {"service": "twitter"},
    {
        $set: {
            "consumerKey": "da4r5pUWytrdy1ztR6bDfvW5U",
            "secret": "oS0KtY1WsGv4yt3fSz6UbJVFXB1riAr5aVLngdOZl9sX9Fx2Je",
            "loginStyle": "popup"
        }
    });


ServiceConfiguration.configurations.upsert(
    {"service": "meetup"},
    {
        $set: {
            "clientId": process.env.MEETUP_CLIENT_ID ,
            "secret": process.env.MEETUP_SECRET,
            "loginStyle": "popup"
        }
    });

//Meteor.startup(function () {
//    if (Meteor.users.findOne("8GSPBYEj6Hcfcmzq6"))
//        Roles.addUsersToRoles("8GSPBYEj6Hcfcmzq6", ['admin']);
//});