
switch (process.env.ROOT_URL) {
    case "http://localhost:3000/":
        process.env.MEETUP_CLIENT_ID = "38k5c02dj52h5mga9k321ud3uq";
        process.env.MEETUP_SECRET = "s9b2b3tdk6dmfng9vsmuqi5jjj";
        process.env.FACEBOOK_CLIENT_ID = "392906830890754";
        process.env.FACEBOOK_SECRET = "bebe3ceb92be8ec14a363ff325af9a49";
        process.env.GOOGLE_CLIENT_ID = "999855433817-0n06f7rotm4nq1lkdeq7850fde2cin7h.apps.googleusercontent.com";
        process.env.GOOGLE_SECRET = "nOOTfPCRL8SnntlE6tUeEam8";
        process.env.TWITTER_CLIENT_ID = "da4r5pUWytrdy1ztR6bDfvW5U";
        process.env.TWITTER_SECRET = "oS0KtY1WsGv4yt3fSz6UbJVFXB1riAr5aVLngdOZl9sX9Fx2Je";
        break;
    case "http://focallocal.meteor.com/":
        process.env.MEETUP_CLIENT_ID = "r2p02hica9uktu1uqpk1d184o9";
        process.env.MEETUP_SECRET = "i7605716jmpbef8o2kumlo70cj";
        process.env.FACEBOOK_CLIENT_ID = "392906830890754";
        process.env.FACEBOOK_SECRET = "bebe3ceb92be8ec14a363ff325af9a49";
        process.env.GOOGLE_CLIENT_ID = "999855433817-0n06f7rotm4nq1lkdeq7850fde2cin7h.apps.googleusercontent.com";
        process.env.GOOGLE_SECRET = "nOOTfPCRL8SnntlE6tUeEam8";
        process.env.TWITTER_CLIENT_ID = "da4r5pUWytrdy1ztR6bDfvW5U";
        process.env.TWITTER_SECRET = "oS0KtY1WsGv4yt3fSz6UbJVFXB1riAr5aVLngdOZl9sX9Fx2Je";
        break;
}

ServiceConfiguration.configurations.upsert(
    {"service": "facebook"},
    {
        $set: {
            "appId": process.env.FACEBOOK_CLIENT_ID,
            "secret": process.env.FACEBOOK_SECRET,
            "loginStyle": "popup"
        }
    });

ServiceConfiguration.configurations.upsert(
    {"service": "google"},
    {
        $set: {
            "clientId": process.env.GOOGLE_CLIENT_ID,
            "secret": process.env.GOOGLE_SECRET,
            "loginStyle": "popup"
        }
    });


ServiceConfiguration.configurations.upsert(
    {"service": "twitter"},
    {
        $set: {
            "consumerKey": process.env.TWITTER_CLIENT_ID,
            "secret": process.env.TWITTER_SECRET,
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

Categories.upsert( {"_id": "1"}, { $set: { "name": "Pillow Fight 4Connection", "color" : '#E42B33' } });
Categories.upsert( {"_id": "2"}, { $set: { "name": "Take a Smile", "color" : '#DBDB00' } });
Categories.upsert( {"_id": "3"}, { $set: { "name": "Give a Bubble", "color" : '#E9A743' } });
Categories.upsert( {"_id": "4"}, { $set: { "name": "Free Hugs", "color" : '#CD36EC' } });
Categories.upsert( {"_id": "5"}, { $set: { "name": "Musical Connection", "color" : '#05C7F2' } });
Categories.upsert( {"_id": "6"}, { $set: { "name": "Connecting Canvas", "color" : '#E9A743' } });
Categories.upsert( {"_id": "7"}, { $set: { "name": "Inspire YOUR City", "color" : '#FFF13B' } });
Categories.upsert( {"_id": "8"}, { $set: { "name": "Guerrilla Urban Beautification", "color" : '#1AF23A' } });
Categories.upsert( {"_id": "9"}, { $set: { "name": "Lets Talk about Togetherness", "color" : '#84EC9E' } });
Categories.upsert( {"_id": "10"}, { $set: { "name": "Community Slip n Slide", "color" : '#7F31E4' } });
Categories.upsert( {"_id": "11"}, { $set: { "name": "Togetherness Projects", "color" : '#BE93DB' } });

//Meteor.startup(function () {
//    if (Meteor.users.findOne("8GSPBYEj6Hcfcmzq6"))
//        Roles.addUsersToRoles("8GSPBYEj6Hcfcmzq6", ['admin']);
//});