AutoForm.hooks({
	 'events-form': {
			 onSuccess: function (operation, result, template) {
				 	// TODO: Close modal

					 Materialize.toast('Event submitted successfully!', 4000);

					 Session.set("selected", result);
					 $('#congratsModal').openModal({
							dismissible: false
						});
					 GAnalytics.event("Events","create");
			 },
			 onError: function(formType, error) {
					 GAnalytics.event("Events","form_error");
					 console.error(error);
			 }
	 }
});

Template.newEvent.onCreated(function() {
	create.call(this);
});

Template.newEvent.helpers({
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

	onRendered.call(this);

	// Initialize sequence
	var sequence = new SequenceForm('.sequence-form-fields', '#next', 'button[type="submit"]', '#back');
	 sequence.init()
});

Template.newEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
