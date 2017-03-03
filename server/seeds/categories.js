Meteor.startup(function () {
    if (Categories.find({}).count() === 0) {
        Categories.insert({"name": "Pillow Fight 4Connection", "color": '#d50000'});
        Categories.insert({"name": "Take a Smile", "color": '#33691e'});
        Categories.insert({"name": "Give a Bubble", "color": '#304ffe'});
        Categories.insert({"name": "Free Hugs", "color": '#c51162'});
        Categories.insert({"name": "Musical Connection", "color": '#3e2723'});
        Categories.insert({"name": "Connecting Canvas", "color": '#ff3d00'});
        Categories.insert({"name": "Inspire YOUR City", "color": '#ff6d00'});
        Categories.insert({"name": "Guerrilla Urban Beautification", "color": '#00c853'});
        Categories.insert({"name": "Lets Talk about Togetherness", "color": '#aeea00'});
        Categories.insert({"name": "Community Slip n Slide", "color": '#6200ea'});
        Categories.insert({"name": "Togetherness Projects", "color": '#00bfa5'});
        console.log("categories updated " + Categories.find({}).count());
    }
});