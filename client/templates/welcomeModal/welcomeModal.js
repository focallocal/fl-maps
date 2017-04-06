var sequence = undefined;

Template.welcomeModal.onCreated(function() {
	this.debounce = null;
});

Template.welcomeModal.onRendered(function() {
	sequence = new SequenceForm('#welcome-sequence', '#welcome-btn-next', '#explore-btn', '#welcome-btn-back');

	sequence.init();

	Meteor.typeahead.inject();

	var fixMaterializeActiveClassTrigger = function() {
			$('#search-start-location-container').find('input[name=welcome-location]').detach().insertBefore($('#search-start-location-container').find('.twitter-typeahead'));
			$('#search-start-location-container').find('.twitter-typeahead').find('input[type=text]').remove();
	};
	//this is a hack, because Typeahead duplicates input and inserts it inside of a new span item which breaks Materialize
	fixMaterializeActiveClassTrigger();

	$("#explore-btn").on('click', function() {
		$("#welcomeModalClose").click();
	});

	$("#welcome-discover").on('click', function() {
		$("#welcomeModalClose").click();
		FlowRouter.go('/events/list');
	});

	$("#welcome-create").on('click', function() {
		$("#welcomeModalClose").click();
		$("#event-new-btn").click();
	});

	$("#welcome-login").on("click", function() {
		$("#welcomeModalClose").click();
		FlowRouter.go('/sign-in');
	});
});

Template.welcomeModal.helpers({
	geocodeDataSource: function(query, sync, asyncCallback) {
		var instance = Template.instance();
		if (instance.debounce) {
				Meteor.clearTimeout(instance.debounce);
		}
		const debounceDelay = 500; //wait half a second before triggering search
		instance.debounce = Meteor.setTimeout(function() {
			Meteor.call('getCoords', query, function (error, result) {
				console.info("Query: " + query);
				var mapResultToDisplay = function () {
					return result.map(function (v) {
						console.info("Response: " + JSON.stringify(v));
						var streetName = _.isNull(v.streetName) ? '' : v.streetName + ' ';
						var streetNumber = _.isNull(v.streetNumber) ? _.isEmpty(streetName) ? '' : ', ' : +v.streetNumber + ', ';
						var city  = _.isNull(v.city) ? '' : v.city + ', ';
						var state  = _.isNull(v.state) ? '' : v.state + ', ';
						return {
							value: streetName + streetNumber + city + state + v.country,
							lat: v.latitude,
							lng: v.longitude};
						}
					);
				};

				if (error != undefined) {
						console.error(error);
						// Set error
				} else {
						asyncCallback(mapResultToDisplay());
				}
			});
		}, debounceDelay);
	},
	selectedHandler: function selectedHandler(event, suggestion, datasetName) {

		$("#welcomeModal").hide(500);
		$(".lean-overlay").css({"opacity": 0});

		var latLng = new google.maps.LatLng(suggestion.lat, suggestion.lng);
		eventMap.panTo(latLng);
		if(eventMap.getZoom() < 12){
			eventMap.setZoom(12);
		}

		setTimeout(function() {
			$("#welcomeModal").show(500);
			$(".lean-overlay").css({"opacity": 0.5});
		}, 2000);
	}
});
