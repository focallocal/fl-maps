var sequence = undefined;

AutoForm.hooks({
	 'events-form-new': {
			 onSuccess: function (operation, result, template) {
				 	// TODO: Close modal
					 clearForm();
					 $("#newEventFormClose").click();
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

function clearForm() {
	AutoForm.resetForm('events-form');
	$("#eventTitle").text('New Gather');
	sequence.resetSequence();
}

Template.newEvent.viewmodel({
	clearForm: clearForm
});

Template.newEvent.onCreated(function() {
	create.call(this);
});

Template.newEvent.helpers({
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

	if (Session.get('isEdit') === true) {
		return;
	}

	$("#new-resource").on('click', function() {
		var category = Categories.find({name: "Offer A New Resource"}).fetch()[0];
		if (category !== undefined) {
			var $categoryContainer = $("#category-container");
			$categoryContainer.find("ul").find('li span:contains(' + category.name + ')').click();
		}
	});

	Meteor.typeahead.inject();

	var fixMaterializeActiveClassTrigger = function() {
			$('#events-form-new').find('input[name=address]').detach().insertBefore($('#events-form-new').find('.twitter-typeahead'));
			$('#events-form-new').find('.twitter-typeahead').find('input[type=text]').remove();
	};
	//this is a hack, because Typeahead duplicates input and inserts it inside of a new span item which breaks Materialize
	fixMaterializeActiveClassTrigger();

	onRendered.call(this);

	sequence = new SequenceForm('.sequence-form-fields', '#next', '#new-event-submit', '#back');

	// Initialize sequence
	sequence.init();

	sequence.setBeforeNextTrigger(function(inputContainer) {
		 $("#eventsFormModal").css({height: ""});

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

				 } else if (name === 'coordinates.lat' && $elem.val().length === 0) {

					 valid = false;

				 } else if (name === 'findHints') {

					 $elem.focus();
					 $elem.val('Not Provided');
					 valid = true;

				 } else if (name === 'time' && $elem.val().length === 0) {

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

	 $('#event-name').on('input', function() {
		 var $this = $(this);
		 var $title = $("#eventTitle");

		 if ($this.val().length > 0) {
			$title.text($this.val());
		} else {
			$title.text("New Gather");
		}
	 });

	 // Fix height issue
	 $('input[data-schema-key="dateEvent"]').on('focus', function() {
		 var $this = $(".picker__wrap");
		 var height = $this.height();

		 $("#eventsFormModal").height(height);
	 });
});

Template.newEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
