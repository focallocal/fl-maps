Template.userInfo.events({
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
	'click .user-info-ban-btn': function(event, template) {
		var id = template.data._id;
		console.error(template.data);
		Meteor.call('Admin.banUserById', id, function(err, result) {
			Materialize.toast(result, 3000);
		});
	},
	'click .user-info-unban-btn': function(event, template) {
		var id = template.data._id;
		console.error(template.data);
		Meteor.call('Admin.unbanUserById', id, function(err, result) {
			Materialize.toast(result, 3000);
		});
	}
});
