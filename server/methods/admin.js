Meteor.methods({
	'Admin.addFromEmail': function(email) {

		if (!Meteor.user()) {
			return 'Access Denied';
		}

		// Check if user is an admin
		if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
			return "Access Denied";
		}

		var user = Accounts.findUserByEmail(email);

		if (!user) {
			return "User not Found";
		}

		Roles.addUsersToRoles(user._id, 'admin', Roles.GLOBAL_GROUP);

		return email + " is now an admin";
	},
	'Admin.removeFromEmail': function(email) {

		if (!Meteor.user()) {
			return 'Access Denied';
		}
		// Check if user is an admin
		if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
			return "Access Denied";
		}

		var user = Accounts.findUserByEmail(email);

		if (!user) {
			return "User not Found";
		}

		if (user._id === Meteor.user()._id) {
			return "Self can't be removed from admin group";
		}

		Roles.setUserRoles(user._id, [], Roles.GLOBAL_GROUP);

		return email + " is no longer an admin";
	},
	'Admin.getAdmins': function() {

		if (!Meteor.user()) {
			return 'Access Denied';
		}

		if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
			Meteor.Error('permission', 'Access Denied');
			return;
		}

		return Roles.getUsersInRole('admin').fetch();

	}
});
