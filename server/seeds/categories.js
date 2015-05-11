Meteor.startup(function() {
if (Categories.find({}).count() === 0) {
    Categories.upsert({"_id": 1}, {$set: {"name": "Pillow Fight 4Connection", "color": '#d50000'}});
    Categories.upsert({"_id": 2}, {$set: {"name": "Take a Smile", "color": '#33691e'}});
    Categories.upsert({"_id": 3}, {$set: {"name": "Give a Bubble", "color": '#304ffe'}});
    Categories.upsert({"_id": 4}, {$set: {"name": "Free Hugs", "color": '#c51162'}});
    Categories.upsert({"_id": 5}, {$set: {"name": "Musical Connection", "color": '#0091ea'}});
    Categories.upsert({"_id": 6}, {$set: {"name": "Connecting Canvas", "color": '#ff3d00'}});
    Categories.upsert({"_id": 7}, {$set: {"name": "Inspire YOUR City", "color": '#ff6d00'}});
    Categories.upsert({"_id": 8}, {$set: {"name": "Guerrilla Urban Beautification", "color": '#00c853'}});
    Categories.upsert({"_id": 9}, {$set: {"name": "Lets Talk about Togetherness", "color": '#aeea00'}});
    Categories.upsert({"_id": 10}, {$set: {"name": "Community Slip n Slide", "color": '#6200ea'}});
    Categories.upsert({"_id": 11}, {$set: {"name": "Togetherness Projects", "color": '#00bfa5'}});
    console.log("categories updated " + Categories.find({}).count());
}
});