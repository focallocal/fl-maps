function addAdmin() {
	// Select input
	var $addAdminForm = $("#enable-admin-form");
	var email = $addAdminForm.find('input[name="email"]').val();

	if (email.length === 0) {
		// Not Valid
		return;
	}

	Meteor.call('Admin.addFromEmail', email, function(err, result) {
		Materialize.toast(result, 4000);
	});
}

function removeAdmin() {
	// Select input
	// Select input
	var $removeAdminForm = $("#remove-admin-form");
	var email = $removeAdminForm.find('input[name="email"]').val();

	if (email.length === 0) {
		// Not Valid
		return;
	}

	Meteor.call('Admin.removeFromEmail', email, function(err, result) {
		Materialize.toast(result, 4000);
	});
}

Template.godmode.onCreated(function() {
	this.admins = new ReactiveVar([]);
	this.subscribe("categories");
	var instance = this;

	Meteor.call('Admin.getAdmins', function(err, result) {
		if (err) {
			Materialize.toast(err.message, 4000);
		} else {
			instance.admins.set(result);
		}
	});

});

Template.godmode.helpers({
	admins: function() {
		return Template.instance().admins.get();
	},
	categories: function() {
		return Categories.find({});
	}
});

Template.godmode.onRendered(function() {
	// Click Events
	$("#enable-admin-btn").on('click', function() {
		addAdmin();
	});

	$("#remove-admin-btn").on('click', function() {
		removeAdmin();
	});

	// $(".toggle-approval-category").on('click', function() {
	// 	console.log("ASDFADS");
	// 	var categoryName = $(this).val();
	// 	Meteor.call('Categories.approveToggle', Template.instance().categoriesByName[categoryName]);
	// });
});

Template.godmode.events({
	'click .toggle-approval-category': function() {
		Meteor.call('Categories.approveToggle', this._id);
	}
});
