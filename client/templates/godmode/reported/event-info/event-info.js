Template.eventInfo.events({
	'click .collapse-btn': function(event) {
		window.requestAnimationFrame(function() {
			$(".event-info-body-active").removeClass("event-info-body-active");
		});
		window.requestAnimationFrame(function() {
			$(event.currentTarget).parents(".event-info-collapse").find(".event-info-body").addClass("event-info-body-active");
		});
	}
});
