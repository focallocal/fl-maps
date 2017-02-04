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
	 sequence.init();

	 sequence.setBeforeNextTrigger(function(inputContainer) {
		 var $fields = inputContainer.find('.validate-field');
		 var $inputs = $fields.find('input');

		 var selectInput = $fields.find('select');

		 if (selectInput !== undefined) {
			 $inputs.push(selectInput);
		 }

		 var valid = true;

		 $inputs.each(function(elem) {
			 var $elem = $($inputs[elem]);
			 var name = $elem.attr('name');

			 if (name !== undefined && name.length !== 0) {

				 if (name === 'category._id' && $elem.val().length === 0) {

					 valid = false;

				 } else {

					 var inputValid = AutoForm.validateField('events-form', name, false);
					 valid = valid && inputValid;

					 if ($elem.val().length === 0 && $elem.attr('type') === 'text') {
						 valid = false;
					 }
				 }
			 }
		 });

		 return valid;
	 });
});

Template.newEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
