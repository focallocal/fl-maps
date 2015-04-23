Events = new Mongo.Collection('events');

Events.helpers({

});

//Events.before.insert(function(userId, doc) {
//    doc.datePublished = moment().toDate();
//});

Events.attachSchema(new SimpleSchema({
    organiser: {
        type: String,
        label: 'Organiser',
        optional: true,
        max: 50,
        autoform: {
            omit: true
        },
        autoValue: function() {
            return "testuser"; //Meteor.user().emails[0].address; //TODO username from fb,google,twitter
        }
    },
    category: {
        type: String,
        label: 'Category',
        autoform: {
            options: function() {
                return Categories.find().map(function(cat) {
                    return {label: cat.name, value: cat._id};
                });
            },
            label: false,
            firstOption: 'Choose the event category'
        }
    },
    name: {
        type: String,
        label: 'Event name',
        max: 100
    },
    location: {
        type: String,
        label: 'Location',
        max: 100
    },
    meetingPoint: {
        type: String,
        label: 'Meeting point',
        max: 100
    },
    dateEvent: {
        type: String,
        label: 'Date of the event',
        autoform: {
            class: 'datepicker'
        }
    },
    url: {
        type: String,
        label: 'Link',
        optional: true,
        max: 200,
        regEx: SimpleSchema.RegEx.Url
    },
    description: {
        type: String,
        label: 'Description',
        max: 1000
    },
    coordinates: {
        type: Object,
        optional: true,
        autoform: {
            omit: true
        }
    },
    'coordinates.lat': {
        type: Number
    },
    'coordinates.lng': {
        type: Number
    },
    datePublished: {
        type: Date,
        label: 'Date published',
        optional: true,
        autoform: {
            omit: true
        },
        autoValue: function() {
            return moment().toDate();
        }
    }
}));
