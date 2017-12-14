Template.welcomeScreen.onRendered(function() {
	$(".legend-tour").hide();
	$(".map-tour").hide();
	$(".add-tour").hide();
	$(".map-tour").hide();
	$(".handout-tour").hide();
	$(".more-tour").hide();

	$("#event-new-btn").hide();
});

var hideAll = function() {
	$("#tour-start").hide();

	$(".legend-tour").hide();
	$(".map-tour").hide();
	$(".add-tour").hide();
	$(".map-tour").hide();
	$(".handout-tour").hide();
	$(".more-tour").hide();

	$("#event-new-btn").hide();
}

Template.welcomeScreen.events({
	'click #done-tour': function() {
		$("#welcome-screen").hide();
		$("#event-new-btn").show();
		$("#guide-btn").show();

		$("#event-new-btn").removeAttr('disabled');
	},
	'click #legend-tour': function() {
		hideAll();

		$('.legend-tour').show();
	},
	'click .map-tour': function() {
		hideAll();

		$('.map-tour').show();
	},
	'click #post-tour': function() {
		hideAll();

		$(".add-tour").show();
		$("#event-new-btn").show();
		$("#event-new-btn").attr('disabled', 'disabled');
	},
	'click #map-tour': function() {
		hideAll();

		$(".map-tour").show();
	},
	'click #handout-tour': function() {
		hideAll();

		$(".handout-tour").show()
	},
	'click #more-tour': function() {
		hideAll();

		$(".more-tour").show();
	}
})
