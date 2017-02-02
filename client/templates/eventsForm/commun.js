setCharCount = function setCharCount(limit, $elem) {
	 $elem.parent().append('<div class="characters-left-container"><span class="characters-left">' + limit + '</span> Characters Left</div>');

	 $elem.on('input', function() {
			 var $this = $(this);
			 $this.parent().find(".characters-left").text(limit - $this.val().length);
	 });
};

create = function create() {
	this.debounce = null;
	this.autocompleteMapData = new ReactiveVar([], false);
	this.subscribe('categories');
	this.setCoordinates = function (lat, lng) {
			var instance = Template.instance();
			instance.$('input[name="coordinates.lat"]').val(lat);
			instance.$('input[name="coordinates.lng"]').val(lng);
	};
};

geocodeDataSource = function geocodeDataSource(query, sync, asyncCallback) {
	var instance = Template.instance();
	if (instance.debounce) {
			Meteor.clearTimeout(instance.debounce);
	}
	const debounceDelay = 500; //wait half a second before triggering search
	 instance.debounce = Meteor.setTimeout(function() {
			Meteor.call('getCoords', query, function (error, result) {
					console.info("Query: " + query);
					var mapResultToDisplay = function () {
							var isCity = function(element, index) {
									return element.city!=null
							};
							return result.filter(isCity).map(function (v) {
											console.info("Response: " + JSON.stringify(v));
											var streetName = _.isNull(v.streetName) ? '' :v.streetName + ' ';
											var streetNumber = _.isNull(v.streetNumber) ? _.isEmpty(streetName) ? '' : ', ' : +v.streetNumber + ', ';
											var city  = _.isNull(v.city) ? '' : v.city + ', ';
											var state  = _.isNull(v.state) ? '' : v.state + ', ';
											return {
													 value: streetName + streetNumber + city + state + v.country,
													 lat: v.latitude,
													 lng: v.longitude
											};
									}
							);
					};

					if (error != undefined) {
							console.error(error);
							Events.simpleSchema().namedContext("events-form").addInvalidKeys([{
									name: "address",
									type: "offline"
							}]);
					} else {
							asyncCallback(mapResultToDisplay());
					}
			});
	}, debounceDelay);
};

selectedHandler = function selectedHandler(event, suggestion, datasetName) {
	var coordsDefined = !_.isUndefined(suggestion.lat) && !_.isUndefined(suggestion.lng);
	if (coordsDefined) {
			Template.instance().setCoordinates(suggestion.lat,suggestion.lng);
			AutoForm.validateField('events-form', 'coordinates', false); //remove potential validation error
	} else {
			throw Meteor.Error('cords-undefined', 'Coordinates are empty for the selected location');
	}
};

onRendered = function onRendered() {
	Meteor.typeahead.inject();

	this.$('input[name=address]').detach().insertBefore('.twitter-typeahead');
	this.$('.twitter-typeahead').find('input[type=text]').remove();
	var fixMaterializeActiveClassTrigger = function() {
			$('input[name=address]').detach().insertBefore('.twitter-typeahead');
			$('.twitter-typeahead').find('input[type=text]').remove();
	};
	//this is a hack, because Typeahead duplicates input and inserts it inside of a new span item which breaks Materialize
	fixMaterializeActiveClassTrigger();

	// Insert character counter for overview and description
	setCharCount(150, $(".overview-word-limit"));
	setCharCount(400, $(".description-word-limit"));
};

onDestroyed = function onDestroyed() {
	var $typeahead = $('.typeahead');
	$typeahead.unbind();
	AutoForm.resetForm('events-form');
	$typeahead.typeahead('destroy');
}
