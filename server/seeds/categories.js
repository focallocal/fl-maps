Meteor.startup(function () {
    if (Categories.find({}).count() === 0) {
        Categories.insert({"name": "Pillow Fight 4Connection", "color": '#d50000', 'approved': true});
        Categories.insert({"name": "Take a Smile", "color": '#33691e', 'approved': true});
        Categories.insert({"name": "Give a Bubble", "color": '#304ffe', 'approved': true});
        Categories.insert({"name": "Free Hugs", "color": '#c51162', 'approved': true});
        Categories.insert({"name": "Musical Connection", "color": '#3e2723', 'approved': true});
        Categories.insert({"name": "Connecting Canvas", "color": '#ff3d00', 'approved': true});
        Categories.insert({"name": "Inspire YOUR City", "color": '#ff6d00', 'approved': true});
        Categories.insert({"name": "Guerrilla Urban Beautification", "color": '#00c853', 'approved': true});
        Categories.insert({"name": "Lets Talk about Togetherness", "color": '#aeea00', 'approved': true});
        Categories.insert({"name": "Community Slip n Slide", "color": '#6200ea', 'approved': true});
        Categories.insert({"name": "Togetherness Projects", "color": '#00bfa5', 'approved': true});
        console.log("categories updated " + Categories.find({}).count());
    }
});
