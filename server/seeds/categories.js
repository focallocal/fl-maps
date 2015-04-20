Meteor.startup(function() {
    Categories.upsert( {"_id": 1}, { $set: { "name": "Pillow Fight 4Connection", "color" : '#E42B33' } });
    Categories.upsert( {"_id": 2}, { $set: { "name": "Take a Smile", "color" : '#DBDB00' } });
    Categories.upsert( {"_id": 3}, { $set: { "name": "Give a Bubble", "color" : '#E9A743' } });
    Categories.upsert( {"_id": 4}, { $set: { "name": "Free Hugs", "color" : '#CD36EC' } });
    Categories.upsert( {"_id": 5}, { $set: { "name": "Musical Connection", "color" : '#05C7F2' } });
    Categories.upsert( {"_id": 6}, { $set: { "name": "Connecting Canvas", "color" : '#E9A743' } });
    Categories.upsert( {"_id": 7}, { $set: { "name": "Inspire YOUR City", "color" : '#FFF13B' } });
    Categories.upsert( {"_id": 8}, { $set: { "name": "Guerrilla Urban Beautification", "color" : '#1AF23A' } });
    Categories.upsert( {"_id": 9}, { $set: { "name": "Lets Talk about Togetherness", "color" : '#84EC9E' } });
    Categories.upsert( {"_id": 10}, { $set: { "name": "Community Slip n Slide", "color" : '#7F31E4' } });
    Categories.upsert( {"_id": 11}, { $set: { "name": "Togetherness Projects", "color" : '#BE93DB' } });
    console.log("categories " + Categories.find({}).count());
});