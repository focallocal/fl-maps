Template.categoryInfo.events({
	'click .collapse-btn': function(event) {
		var $removeTarget = $(".info-body-active");
		var $currentTarget = $(event.currentTarget).parents(".info-collapse").find(".info-body");
		window.requestAnimationFrame(function() {
			$removeTarget.removeClass("info-body-active");
		});
		window.requestAnimationFrame(function() {
			if ($removeTarget.get(0) === $currentTarget.get(0)) {
				return;
			}
			$currentTarget.addClass("info-body-active");
		});
	}
});
