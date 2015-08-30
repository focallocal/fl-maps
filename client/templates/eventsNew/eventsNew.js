AutoForm.hooks({
    'events-new-form': {
        onSuccess: function (operation, result, template) {
            slidePanel.closePanel();
            Materialize.toast('Event created successfully!', 4000);
            Session.set("selected", result._id)
        },
        onError: function(formType, error) {
            console.error(error);
        }
    }
});

Template.eventsNew.rendered = function() {
    Meteor.typeahead.inject();
};

Template.eventsNew.helpers({
    getCoords: function (query, sync, asyncCallback) {
        Meteor.call('getCoords', query, function (error, result) {
            var mapResultToDisplay = function () {
                return result.map(function (v) {
                        var streetName = _.isNull(v.streetName) ? '' : v.streetName + ' ';
                        var streetNumber = _.isNull(v.streetNumber) ? _.isEmpty(streetName) ? '' : ', ' : +v.streetNumber + ', ';
                        return {
                            value: streetName + streetNumber + v.city + ', ' + v.country,
                            lat: v.latitude,
                            lng: v.longitude
                        };
                    }
                );
            };

            if (error != undefined) {
                console.error(error);
            } else {
                asyncCallback(mapResultToDisplay());
            }
        });
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
    }
});

