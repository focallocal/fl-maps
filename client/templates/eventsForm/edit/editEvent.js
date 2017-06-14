var instance = null;

AutoForm.hooks({
	'events-form': {
			onSuccess: function (operation, result, template) {
					slidePanel.closePanel();
					Materialize.toast('Event submitted successfully!', 4000);

					GAnalytics.event("Events","edit");
			 },
			onError: function(formType, error) {
					GAnalytics.event("Events","form_error");
					console.error(error);
			 }
	 }
});

Template.editEvent.onCreated(function() {
	create.call(this);
	instance = this;
});

Template.editEvent.helpers({
	categories: function() {
		return Categories.find({'approved': true});
	},
	geocodeDataSource: function(query, sync, asyncCallback) {
		geocodeDataSource(query, sync, asyncCallback);
	},
	selectedHandler: function (event, suggestion, datasetName) {
		selectedHandler(event, suggestion, datasetName);
	},
	selectedEventDoc: function() { return Events.findOne(Session.get('selected'));},
	isEdit: function() { return Session.get('isEdit') }
});

function adjustMapHeightToWindowSize($elem) {
	$(window).resize(function () {
	    var h = $(this).height(),
	        offsetTop = $('#menu-top').height();
					$elem.css('height', (h - offsetTop * 2));
	}).resize();
}

Template.autoForm.onRendered(function() {
	if (Session.get('isEdit') !== true) {
		return;
	}
	copyCoordsFromSelectedEvent = function () {
		var selectedEvent = Events.findOne(Session.get('selected'));
		if (selectedEvent != null) {
			instance.setCoordinates(selectedEvent.coordinates.lat, selectedEvent.coordinates.lng);
		}
	};
	copyCoordsFromSelectedEvent();

	Meteor.typeahead.inject();

	var fixMaterializeActiveClassTrigger = function() {
			$('#events-form').find('input[name=address]').detach().insertBefore($('#events-form').find('.twitter-typeahead'));
			$('#events-form').find('.twitter-typeahead').find('input[type=text]').remove();
	};
	//this is a hack, because Typeahead duplicates input and inserts it inside of a new span item which breaks Materialize
	fixMaterializeActiveClassTrigger();

	adjustMapHeightToWindowSize($("#events-form"));

	// Init the event lifetime js
	iniinitLifetime("#events-form");

	onRendered.call(this);
});

Template.editEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
