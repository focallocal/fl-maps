Meteor.startup(function () {
    Factory.define('event', Events, {
        coordinates: function () {
            var address = {
                "lat": _.random(-90, 90),
                "lng": _.random(-180, 180)
            };
            return address;
        },
        organiser: function () {
            var userObject = {
                _id: _.random(1, 11),
                name: Fake.user().name
            }
            return userObject;
        },
        address: function () {
            return Fake.word();
        }
        ,
        name: function () {
            return Fake.word();
        }
        ,
        meetingPoint: function () {
            return Fake.word();
        },
        findHints: function () {
            return Fake.word();
        }
        ,
        time: function() {
            return '12:30';
        }
        ,
        description: function () {
            return Fake.sentence();
        }
        ,
        category: function () {
            return Categories.findOne(_.random(1, 11));
        }
        ,
        dateCreated: function () {
            return moment().format("YYYY-MM-DD");
        }
        ,
        dateEvent: function () {
            return moment().add(_.random(1, 30), 'days').format("YYYY-MM-DD");
        }
    });

    if (Events.find({}).count() === 0) {
        console.log("Repopulating db...");
        _(20).times(function (n) {
            Factory.create('event');
        });
    }
})
;
