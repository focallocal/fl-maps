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
            "clientId": "r2p02hica9uktu1uqpk1d184o9",
            "secret": "i7605716jmpbef8o2kumlo70cj",
            "loginStyle": "popup"
        }
    });
