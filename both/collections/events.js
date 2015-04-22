Events = new Mongo.Collection("events");

Events.helpers({

});

Events.before.insert(function (userId, doc) {
    doc.dateEvent = moment().toDate();
});

Events.attachSchema(new SimpleSchema({
    organiser: {
        type: String,
        label: "Organiser",
        max: 50
    },
    name: {
        type: String,
        label: "Event name",
        max: 100
    },
    coordinates: {
        type: Object
    },
    "coordinates.lat": {
       type: Number
    },
    "coordinates.lng": {
       type: Number
    },
    location: {
        type: String,
        label: "Location",
        max: 100
    },
    meetingPoint: {
        type: String,
        label: "Meeting point",
        max: 100
    },
    url: {
        type: String,
        label: "Link",
        optional: true,
        max: 200,
        regEx: SimpleSchema.RegEx.Url
    },
    category: {
        type: String,
        label: "Category",
        allowedValues: ["Mordka","Karcia"],
        autoform: {
            type: "select2"
        }
    },
    //"category._id": {
    //    type: String
    //},
    //"category.color": {
    //    type: String
    //},
    //"category.name": {
    //    type: String
    //},
    description: {
        type: String,
        label: "Description",
        max: 1000,
        autoform: {
            type: 'textarea'
        }
    },
    datePublished: {
        type: Date,
        label: "Date published"
    },
    dateEvent: {
        type: Date,
        label: "Date and time of the event"
    }
}));
