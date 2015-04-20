Factory.define('event', Events, {
    coordinates: function() {
        var location = {"lat":_.random(-90, 90),
                        "lng":_.random(-180, 180)};
        return location;
    },
    organiser: function() { return Fake.user().name; },
    location: function() { return Fake.word(); },
    name: function() { return Fake.word(); },
    meetingPoint: function() { return Fake.word(); },
    url: function() { return "http://focallocal.org"; },
    description: function() { return Fake.sentence(); },
    category: function() { return Categories.findOne({_id : _.random(1,11)}); },
    datePublished: function() { return moment().format("YYYY-MM-DD"); },
    dateEvent: function() { return moment().format("YYYY-MM-DD"); }
});

if (Events.find({}).count() === 0) {
    console.log("Repopulating db...");
    _(10).times(function(n) {
        Factory.create('event');
    });

}