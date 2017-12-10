Template.welcomeScreen.onRendered(function() {
	$("#tour").hide();
	$("#legend-tour").hide();

	$("#event-new-btn").hide();
	$("#guide-btn").hide();

	$("#adding-tour").hide();
});

var tourCtl = new SequenceForm("#tour", "#next-tour", "#done-tour", "#back-tour");

var beforeNext = function($c) {
	if ($c.attr('value') === '0') {
		$("#legend-tour").hide();
	} else if ($c.attr('value') === '1') {
		$("#event-new-btn").show();
		$("#guide-btn").show();
		$("#adding-tour").show();
	}
	return true;
}

var beforeBack = function(c) {
	if (c.number === 1 ) {
		$("#legend-tour").show();
	} else if (c.number === 2) {
		$("#event-new-btn").hide();
		$("#guide-btn").hide();
		$("#adding-tour").hide();
	}
	return true;
}

Template.welcomeScreen.events({
	'click #tour-pass': function() {
		$('#welcome-screen').hide();
		$("#event-new-btn").show();
		$("#guide-btn").show();
	},
	'click #tour-begin': function() {
		$("#welcome-start").hide();
		$("#tour").show();
		$("#legend-tour").show();

		tourCtl.init();

		tourCtl.setBeforeNextTrigger(beforeNext);
		tourCtl.setBeforeBackTrigger(beforeBack);
	},
	'click #done-tour': function() {
		$("#welcome-screen").hide();
		$("#event-new-btn").show();
		$("#guide-btn").show();
	},
	'click #event-new-btn': function() {
		$("#welcome-screen").hide();
	}
})
