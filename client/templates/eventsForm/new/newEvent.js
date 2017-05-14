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

function lifeTimeValidtion() {
	return oneTimeLifeTimeValidation() && weekLifeTimeValidation() && recurringLifeTimeValidation();
}

function recurringLifeTimeValidation() {
	var $checked = $("#repeating_enable_check");
	var valid = true;
	if ($checked.is(":checked") === true) {
		var frequencyWeekly = $("#frequency_Weekly").is(":checked");
		var frequencyBiweekly = $("#frequency_Biweekly").is(":checked");
		var frequencyMonthly = $("#frequency_Monthly").is(":checked");

		var foreverEnable = $("#forever_enable").is(":checked");

		if (frequencyWeekly || frequencyBiweekly || frequencyMonthly) {
			if (frequencyMonthly) {
				var $monthly = $("#monthly_detail").find("input").first();
				if ($monthly.val() === "Pick a Day!") {
					valid = false;
				}
			}
			if (foreverEnable === false) {
				var $dateLifeTime = $("#lifetime_weeks").find("input");
				console.log($dateLifeTime);
				if ($dateLifeTime.length === 0) {
					valid = false;
				}
			}
		} else {
			valid = false;
		}
	}
	return valid;
}

function dayLifeTimeValidation($day) {
	var $checked = $day.find('input[type=checkbox]');
	var valid = true;
	var checked = false;
	if ($checked.is(":checked") === true) {
		checked = true;
		var inputs = $day.find("input");
		inputs.each(function(i) {
			var $input = $(inputs[i]);
			valid = ($input.val() !== undefined) && ($input.val() !== "Pick a time!") ;
			if (!valid) {
				return false;
			}
		});
	}
	return {validation: valid, checked: checked};
}

function weekLifeTimeValidation() {
	var $oneTimeLifeTimeDisable= $("#week_enable_check");
	var $timesEqualChecked = $("#times-equal").is(":checked");
	var valid = true;
	var enable_valid = true;

	if ($oneTimeLifeTimeDisable.is(":checked") === true) {
		enable_valid = false;
		var days = $(".day-inputs");
		days.each(function(index) {
			var dayValidation = dayLifeTimeValidation($(days[index]));

			if (dayValidation.checked) {
				enable_valid = true;
			}
			if (dayValidation.validation === false && $timesEqualChecked === false) {
				valid = false;
				return false;
			}
		});
	}
	return valid && enable_valid;
}

function oneTimeLifeTimeValidation() {
	var $oneTimeLifeTime = $("#one-time-event");
	var $oneTimeLifeTimeEnable = $("#week_enable_check");
	var $timesEqual = $("#times-equal");
	var valid = true;

	if ($oneTimeLifeTimeEnable.is(":checked") === false || $timesEqual.is(":checked") === true) {
		var $inputs = $oneTimeLifeTime.find("input");
		$inputs.each(function(index) {
			var $elem = $($inputs[index]);
			var val = $elem.val();
			if (val.length === 0 || val === "Pick a time!") {
				valid = false;
			}
			if (valid === false) {
				return false;
			}
		});
	}
	return valid;
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
		var category = Categories.find({name: "Community Support (Offers)"}).fetch()[0];
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

	onRendered.call(this);

	sequence = new SequenceForm('.sequence-form-fields', '#next', '#new-event-submit', '#back');

	// Initialize sequence
	sequence.init();

	sequence.setBeforeNextTrigger(function(inputContainer) {
		 $("#eventsFormModal").css({height: ""});

		 if (inputContainer.attr("id") === "lifetime-section") {
			 return lifeTimeValidtion();
		 }

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

				 } else {

					 var inputValid = AutoForm.validateField('events-form-new', name, false);
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

	 $(".tabs-fix-width").width("900px");

});

Template.newEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
