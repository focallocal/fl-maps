Events = new Mongo.Collection('events');

Events.before.insert(function(userId, doc) {
    doc.dateCreated = new Date();
    if (userId) { //checks if request comes from frontend
        var user = Meteor.user();
        doc.organiser = {
            _id: userId,
            name: user.profile.name
        }
    }
});
Events.attachSchema(new SimpleSchema({
    organiser: {
        type: Object,
        autoform: {
            omit: true
        }
    },
    'organiser._id': {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    'organiser.name': {
        type: String,
        autoform: {
            type: 'hidden'
        }
    },
    category: {
        type: Object
    },
    'category._id': {
        type: Number,
        //optional: true,
        autoform: {
            options: function() {
                return Categories.find().map(function(cat) {
                    return {label: cat.name, value: cat._id};
                });
            },
            label: false,
            firstOption: 'Choose event category'
        }
    },
    'category.name': {
        type: String,
        autoform: {
            type: 'hidden'
        },
        optional: true,
        autoValue: function() {
            var categoryId = this.field('category._id').value;
            if (!categoryId) return null;
            return Categories.findOne(categoryId).name;
        }
    },
    'category.color': {
        type: String,
        autoform: {
            type: 'hidden'
        },
        optional: true,
        autoValue: function() {
            var categoryId = this.field('category._id').value;
            if (!categoryId) return null;
            return Categories.findOne(categoryId).color;
        }
    },
    name: {
        type: String,
        label: 'Event name',
        max: 100
    },
    address: {
        type: String,
        label: 'Address or postcode',
        max: 100,
        autoform: {
            //add attributes to the form element
            afFieldInput: {
                //SEE DOCS: https://github.com/sergeyt/meteor-typeahead
                'class': "typeahead",
                'data-source': "geocodeDataSource",
                'data-min-length': "3",
                'data-autoselect': "true",
                'data-highlight': "true",
                'data-selected': "selectedHandler"
            }
        },
        //@TODO could be nice if we could validate ONLY this field on blur, this could save API usage
        custom: _.debounce(function() {
            if (Meteor.isClient && this.isSet) {
                Meteor.call("getCoords", this.value, function (error, result) {
                    if (typeof result == 'undefined' || result.length == 0) {
                        Events.simpleSchema().namedContext("events-form").addInvalidKeys([{
                            name: "address",
                            type: "notFound"
                        }]);
                    }
                });
            }
        },600)
    },
    coordinates: {
        type: Object,
        autoform: {
            //type: "hidden"
        },
        optional: true,
        custom: function() {
            var invalidKeys = Events.simpleSchema().namedContext("events-form").invalidKeys().
                map(function(key){
                    return key.name
                });
            var addressKey = 'address';
            var isAddressValid = !_.contains(invalidKeys,addressKey);
            if (isAddressValid) {
                if (!this.isSet) return "required";
            }
        }
    },
    'coordinates.lat': {
        type: Number,
        decimal: true,
        autoform: {
            //disabled: true
            type: "hidden",
            label: false
        }
    },
    'coordinates.lng': {
        type: Number,
        decimal: true,
        autoform: {
            //disabled: true
            type: "hidden",
            label: false
        }
    },
    meetingPoint: {
        type: String,
        label: 'Meeting point',
        max: 100
    },
    findHints: {
        type: String,
        label: 'How to find us?',
        max: 250
    },
    dateEvent: {
        type: Date,
        label: 'Date of the event',
        autoform: {
            type: 'pickadate',
            pickadateOptions: {
                format: 'd mmmm, yyyy',
                formatSubmit: 'yyyy-mm-dd'
            }
        }
    },
    time: {
        type: Number,
        label: 'Hour'
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
    dateCreated: {
        type: Date,
        label: 'Date published',
        autoform: {
            omit: true
        }
    }
}));
SimpleSchema.messages({
    "required category._id": "Please select a category",
    "required coordinates": "Please provide an address",
    "notFound address": "Address not found",
    "offline address": "Address not available, are you offline?"
});