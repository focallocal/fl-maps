Template.eventInfo.onCreated(function() {
	this.engagement = this.data.engagement || {limit: 0, attendees: []};
	this.deleteClickCount = new ReactiveVar(0);
});

Template.eventInfo.helpers({
	attending: function() {
		return Template.instance().engagement.attendees.length || 0;
	},
	limit: function() {
		return Template.instance().engagement.limit;
	}
});

Template.eventInfo.events({
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
	},
	'click .event-info-delete-btn': function(event, template) {
		var count = template.deleteClickCount.get() + 1;
		template.deleteClickCount.set(count);

		if (count === 1) {
			var $target = $(event.currentTarget);
			$target.removeClass('black-text');
			$target.addClass('red-text');
		} else if (count === 2) {
			Events.remove(template.data._id);
		}
	}
});
