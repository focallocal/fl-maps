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
});

Template.editEvent.helpers({
	categories: function(){
		return Categories.find({});
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

Template.autoForm.onRendered(function () {
	 var copyCoordsFromSelectedEvent = function () {
			 var selectedEvent = Events.findOne(Session.get('selected'));
			 if (selectedEvent != null) {
					 console.log(Template.instance());
					 Template.instance().setCoordinates(selectedEvent.coordinates.lat, selectedEvent.coordinates.lng);
			 }
	 };
	 copyCoordsFromSelectedEvent();

	 onRendered.call(this);
});

Template.editEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
