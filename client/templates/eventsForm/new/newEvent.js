var sequence = undefined;
var defaultCategory = new ReactiveVar('');

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

	Tracker.autorun(function() {
		var temp = Categories.find({default: true}).fetch()[0];
		if (temp !== undefined) {
			defaultCategory.set(temp.name);
		}
	});
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
		var category = Categories.find({name: defaultCategory.get()}).fetch()[0];
		if (category !== undefined) {
			var $categoryContainer = $("#category-container");
			$categoryContainer.find("ul").find('li span:contains(' + category.name + ')').click();
		}
		$("#next").click();
	});

	Meteor.typeahead.inject();

	var fixMaterializeActiveClassTrigger = function() {
			$('#events-form-new').find('input[name=address]').detach().insertBefore($('#events-form-new').find('.twitter-typeahead'));
			$('#events-form-new').find('.twitter-typeahead').find('input[type=text]').remove();
	};
	//this is a hack, because Typeahead duplicates input and inserts it inside of a new span item which breaks Materialize
	fixMaterializeActiveClassTrigger();

// Init lifetime section js
	iniinitLifetime("#events-form-new");

	$("#new-limitless").on('click', function() {
		// Checks for the state of the limitless button
		var $this = $(this);
		if ($this.is(":checked") === false) {
			// Hide the limit field
			$("#new-limit-container").show();
			$('#events-form-new input[name="engagement.limit"]').val(0);
		} else {
			// Show the limit field
			$("#new-limit-container").hide();
		}
	});

	onRendered.call(this);

	sequence = new SequenceForm('.sequence-form-fields', '#next', '#new-event-submit', '#back');

	// Initialize sequence
	sequence.init();

	function finishLifetimeValidation() {
		var lifetimeInvalid = $("#lifetime-section").find(".mdi-alert-warning").length !== 0;

		if (lifetimeInvalid == true) {
			return false;
		} else {
			// Make sure that week days & frequency are valid
			AutoForm.getValidationContext('events-form-new').resetValidation();
			// Skip trigger
			sequence.next(true);
		}
	}

	sequence.setBeforeNextTrigger(function(inputContainer) {
		 $("#eventsFormModal").css({height: ""});

		 if (inputContainer.attr("id") === "lifetime-section") {
			 // Validate the whole form becuase of a bug in autoform
			 AutoForm.validateForm('events-form-new');
			 setTimeout(finishLifetimeValidation, 300);
			 return false;

		 } else {

			 var $fields = inputContainer.find('.validate-field');

			 var $inputs = $fields.find('input');

			 var selectInput = $fields.find('select');

			 if (selectInput !== undefined) {
				 $inputs.push(selectInput);
			 }

			 var valid = true;

			 $inputs.each(function(elem) {
				 var $elem = $($inputs[elem]);
				 var name = $elem.attr('name') || $elem.attr('data-schema-key');

				 if (name !== undefined && name.length !== 0) {

					 if (name === 'category._id' && $elem.val().length === 0) {

						 valid = false;

					 } else if (name === 'coordinates.lat' && $elem.val().length === 0) {

						 valid = false;

					 } else if (name === 'findHints') {

						 $elem.focus();
						 $elem.val('Not Provided');
						 valid = true;

					 } else {

						 if ($elem.val().length === 0 && $elem.attr('type') === 'text') {
							 valid = false;
						 }

					 }
				 }
			 });
			 return valid;
		 }
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

	 $(".tabs-fix-width").width("900px");

});

Template.newEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
