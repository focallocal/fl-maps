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

Template.manage.onCreated(function() {
	this.admins = new ReactiveVar([]);
	var instance = this;

	Meteor.call('Admin.getAdmins', function(err, result) {
		if (err) {
			Materialize.toast(err.message, 4000);
		} else {
			instance.admins.set(result);
		}
	});

});

Template.manage.helpers({
	admins: function() {
		return Template.instance().admins.get();
	}
});

Template.manage.events({
	'click #enable-admin-btn': function() {
		addAdmin();
	},
	'click #remove-admin-btn': function() {
		removeAdmin();
	}
});
