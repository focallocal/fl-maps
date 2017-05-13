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

WeekDay = new SimpleSchema({
    enable: {
        type: Boolean,
        defaultValue: false,
        autoform: {
            label: false,
            class: 'day-enable'
        }
    },
    time: {
        type: String,
        label: 'Opening Time',
        optional: true,
        custom: function() {
            return weekDayValidation.call(this);
        },
        autoform: {
            options: function () {
                return getTimesArr().map(function (entry) {
                    return {label: entry, value: entry};
                });
            },
            firstOption: 'Pick a time!'
        }
    },
    time_end: {
        type: String,
        label: 'Closing Time',
        optional: true,
        custom: function() {
            return weekDayValidation.call(this);
        },
        autoform: {
            options: function() {
                return getTimesArr().map(function(entry) {
                    return {label: entry, value: entry};
                });
            },
            firstOption: 'Pick a time!'
        }
    }
});

Week = new SimpleSchema({
    sunday: {
        type: WeekDay
    },
    monday: {
        type: WeekDay
    },
    tuesday: {
        type: WeekDay
    },
    wednesday: {
        type: WeekDay
    },
    thursday: {
        type: WeekDay
    },
    friday: {
        type: WeekDay
    },
    saturday: {
        type: WeekDay
    }
});

Repetition = new SimpleSchema({
    enable: {
        label: 'Reccuring?',
        type: Boolean,
        defaultValue: false,
        autoform: {
            id: 'repeating_enable_check'
        }
    },
    frequency: {
        label: 'Frequency',
        type: String,
        optional: true,
        custom: function() {
            if (this.siblingField("enable").value && !this.isSet) {
                return "required";
            }
        },
        autoform: {
            type: 'select-radio',
            label: false,
            options: function () {
                return ["Weekly", "Biweekly", "Monthly"].map(function (entry) {
                    return {label: entry, value: entry};
                });
            },
            id: 'frequency'
        }
    },
    monthlyDays: {
        'label': 'Day',
        type: Number,
        optional: true,
        custom: function() {
            if (this.siblingField("enable").value && this.siblingField("frequency").value === "Monthly" && !this.isSet) {
                return "required";
            }
        },
        autoform: {
            options: function () {
                return getDaysArr().map(function (entry) {
                    return {label: entry, value: entry};
                });
            },
            firstOption: 'Pick a Day!'
        }
    },
    forever_enable: {
        type: Boolean,
        label: 'Forever',
        autoform: {
            checked: true,
            id: "forever_enable"
        }
    },
    lifetime_date: {
        type: Date,
        optional: true,
        label: "Ending Date",
        custom: function() {
            var enabled = this.siblingField("forever_enable").value;
            if (!enabled) {
                if (!this.isSet) {
                    return "required";
                }
            }
        },
        autoform: {
            type: 'pickadate',
            pickadateOptions: {
                format: 'd mmmm, yyyy',
                formatSubmit: 'yyyy-mm-dd'
            },
            id: "lifetime-date"
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
        type: String,
        //optional: true,
        autoform: {
            options: function() {
                return Categories.find().map(function(cat) {
                    return {label: cat.name, value: cat._id};
                });
            },
            label: false,
            firstOption: 'Choose Category'
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
            if (!categoryId) return this.value;     //don't change the value if can't find _id
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
            if (!categoryId) return this.value;     //don't change the value if can't find _id
            return Categories.findOne(categoryId).color;
        }
    },
    'category.approved': {
      type: Boolean,
      autoform: {
        type: 'hidden'
      },
      optional: true,
      autoValue: function() {
        var categoryId = this.field('category._id').value;
        if (!categoryId) {
          return false;
        }
        return Categories.findOne(categoryId).approved;
      }
    },
    name: {
        type: String,
        label: 'Event name',
        max: 100,
        autoform: {
            id: "event-name"
        }
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
                'data-select': "selectedHandler"
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
        max: 250,
        optional: true
    },
    dateEvent: {
        type: Date,
        label: 'Date of the action',
        autoform: {
            type: 'pickadate',
            pickadateOptions: {
                format: 'd mmmm, yyyy',
                formatSubmit: 'yyyy-mm-dd'
            }
        }
    },
    time: {
        type: String,
        label: 'Starting Time',
        optional: true,
        custom: function() {
            return lifetimeBasicValidation.call(this);
        },
        autoform: {
            options: function () {
                return getTimesArr().map(function (entry) {
                    return {label: entry, value: entry};
                });
            },
            firstOption: 'Pick a time!'
        }
    },
    time_end: {
        type: String,
        label: 'Closing Time',
        optional: true,
        custom: function() {
            return lifetimeBasicValidation.call(this);
        },
        autoform: {
            options: function() {
                return getTimesArr().map(function(entry) {
                    return {label: entry, value: entry};
                });
            },
            firstOption: 'Pick a time!'
        }
    },
    //optional links to social sites where the event is promoted
    'links.$.url': {
        type: String,
        label: 'Link',
        max: 200,
        regEx: SimpleSchema.RegEx.Url
    },
    overview: {
      type: String,
      label: 'Overview',
      max: 150,
      autoform: {
          type: "textarea",
          class: "overview-word-limit"
      }
  },
    description: {
        type: String,
        label: 'Description',
        max: 400,
        autoform: {
            type: "textarea",
            class: "description-word-limit"
        }
    },
    dateCreated: {
        type: Date,
        label: 'Date published',
        autoform: {
            omit: true
        }
    },
    reported: {
      type: Object,
      optional: true,
      autoform: {
          type: 'hidden'
      }
    },
    'reported.number': {
        type: Number,
        decimal: true,
        autoform: {
            type: 'hidden'
        }
    },
    'reported.status': {
        type: Boolean,
        autoform: {
          type: 'hidden'
        }
    },
    'reported.admin_overwrite': {
        type: Boolean,
        autoform: {
            type: 'hidden'
        }
    },
    'reported.users': {
      type: [String],
      autoform: {
        type: 'hidden'
      }
    },
    week_enable: {
        label: 'More than one day?',
        type: Boolean,
        defaultValue: false,
        autoform: {
            id: 'week_enable_check'
        }
    },
    repetition: {
        type: Repetition,
        optional: true
    },
    week: {
        type: Week,
        optional: true
    }
}));
SimpleSchema.messages({
    "required category._id": "Please select a category",
    "required coordinates": "Please provide an address",
    "notFound address": "Address not found",
    "offline address": "Address not available, are you offline?"
});

function mergeDateTime(date, time) {
    if (date === undefined || time === undefined) {
      return;
    }
    var hour = time.split(':')[0];
    var minutes = time.split(':')[1];
    date.setHours(hour);
    date.setMinutes(minutes);
    return date
}

function getDaysArr() {
    var result = [];
    for (var i = 0; i <= 31; i++) {
        result.push(i);
    }
    return result;
}

//get array of times in 24h format
function getTimesArr() {
    var timeArr = [];
    for (var hour = 8; hour < 24; ++hour) {
        ['00', '30'].forEach(function (minutes) {
            var time = hour + ':' + minutes;
            timeArr.push(time)
        });
    }
    return timeArr
}

// Helper functions for validation
function lifetimeBasicValidation() {
    if (!this.field('week_enable').value && !this.isSet) {
        return "required";
    }
}

function weekDayValidation() {
    if (this.siblingField("enable").value && !this.isSet) {
        return "required";
    }
}
