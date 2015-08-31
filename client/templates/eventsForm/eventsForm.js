AutoForm.hooks({
    'events-form': {
        onSuccess: function (operation, result, template) {
            slidePanel.closePanel();
            Materialize.toast('Event submitted successfully!', 4000);
            Session.set("selected", result._id)
        },
        onError: function(formType, error) {
            console.error(error);
        }
    }
});
Template.eventsForm.onCreated(function() {
    this.debounce = null;
});
Template.eventsForm.helpers({
    geocodeDataSource: function(query, sync, asyncCallback) {
        var instance = Template.instance();
        if (instance.debounce) {
            Meteor.clearTimeout(instance.debounce);
        }
        const debounceDelay = 500; //wait half a second before triggering search
        instance.debounce = Meteor.setTimeout(function() {
            Meteor.call('getCoords', query, function (error, result) {
                var mapResultToDisplay = function () {
                    return result.map(function (v) {
                            var streetName = _.isNull(v.streetName) ? '' : v.streetName + ' ';
                            var streetNumber = _.isNull(v.streetNumber) ? _.isEmpty(streetName) ? '' : ', ' : +v.streetNumber + ', ';
                            var city  = _.isNull(v.city) ? '' : v.city + ', ';
                            return {
                                value: streetName + streetNumber + city + v.country,
                                lat: v.latitude,
                                lng: v.longitude
                            };
                        }
                    );
                };

                if (error != undefined) {
                    console.error(error);
                    return;
                } else {
                    asyncCallback(mapResultToDisplay());
                }
            });
        }, debounceDelay);
    },
    selectedHandler: function (event, suggestion, datasetName) {
        var dropPin = function() {
            var coordsDefined = !_.isUndefined(suggestion.lat) && !_.isUndefined(suggestion.lng);
            if (coordsDefined) {
                $('input[name="coordinates.lat"]').val(suggestion.lat);
                $('input[name="coordinates.lng"]').val(suggestion.lng);
            } else {
                throw Meteor.Error('cords-undefined', 'Coordinates are empty for the selected location');
            }
        };
        dropPin();
    },
    selectedEventDoc: function(){
        return Events.findOne(Session.get('selected'));
    }
});

Template.eventsForm.rendered = function() {
    Meteor.typeahead.inject();
    var selectedEvent = Events.findOne(Session.get('selected'));
    if (selectedEvent != null) {
        this.$('input[name="coordinates.lat"]').val(selectedEvent.coordinates.lat);
        this.$('input[name="coordinates.lng"]').val(selectedEvent.coordinates.lng);
    }
    //this is because Typeahead duplicates input and inserts it inside of a new span item which breaks Materialize
    function fixMaterializeActiveClassTrigger() {
        $('input[name=location]').detach().insertBefore('.twitter-typeahead');
        $('.twitter-typeahead').find('input[type=text]').remove();
    }
    fixMaterializeActiveClassTrigger();
};

Template.eventsForm.destroyed = function() {
    $('.typeahead').typeahead('destroy');
};