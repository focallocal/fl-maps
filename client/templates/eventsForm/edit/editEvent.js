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
	this.categories = new ReactiveVar([]);
	instance = this;

	Tracker.autorun(function() {
		instance.categories.set(Categories.find({}).fetch());
	});
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
	iniinitLifetime("#events-form", window, "#options-edit");

	$("#edit-limitless").on('click', function() {
		// Checks for the state of the limitless button
		var $this = $(this);
		if ($this.is(":checked") === false) {
			// Show the limit field
			$("#edit-limit-container").show();
		} else {
			// Hide the limit field
			$('#events-form input[name="engagement.limit"]').val(0);
			$("#edit-limit-container").hide();
		}
	});

	Tracker.autorun(function() {
		var $categoryInput = $("input#category-select-input-edit");
		var $categoryId = $("#events-form .category-select-id");

		var category = Categories.find({_id: $categoryId.val()}).fetch()[0];

		$categoryInput.val(category.name);

	});

	// Enable Category Select
	var $categoryInput = $("input#category-select-input-edit");
	var $categoryId = $("#events-form .category-select-id");

	var options = function() {
		var categories = instance.categories.get();
		for (category in categories) {
			categories[category].option = categories[category].name;
		}
		return categories;
	}();

	// Initialize the mobile friendly selection UI
	var categorySelection = new OptionSelect(function(selected) {
		$categoryInput.val(selected.option);
		$categoryId.val(selected._id);
	}, '#options-edit', options);

	// Activate time selection on click (OptionSelect)
	$("input#category-select-input-edit").on('click', function(e) {
		e.preventDefault();
		categorySelection.forceSetData(categorySelection);
		categorySelection.open();
		$("#events-form").scrollTop(0);
		return false;
	});

	$("input#category-select-input-edit").on('keydown', function(e) {
		e.preventDefault();
		return false;
	});

	$("input#category-select-input-edit").on("change", function(e) {
		var $this = $(this);
		if (options.indexOf($this.val()) === -1) {
			$this.val('Choose a Category!');
		}
	});

	// Make sure that window does not scroll when focusing on input
	$("#events-form input").on('focus', function(e) {
		e.preventDefault();
	});

	onRendered.call(this);
});

Template.editEvent.onDestroyed(function () {
	onDestroyed.call(this);
});
