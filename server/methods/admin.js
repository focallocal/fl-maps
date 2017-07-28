Meteor.methods({
	'Admin.addFromEmail': function(input) {

		if (!Meteor.user()) {
			return 'Access Denied';
		}

		// Check if user is an admin
		if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
			return "Access Denied";
		}


		// var user = Accounts.findUserByEmail(input)
		// Accounts.findUserByEmail does not work with third party oauth.
		var user = Meteor.users.find({"services.google.email": input}).fetch()[0] ||
								Meteor.users.find({"services.twitter.email": input}).fetch()[0] ||
								Meteor.users.find({"services.facebook.email": input}).fetch()[0];
				user = user || Accounts.findUserByEmail(input);

		if (!user) {
			return "User not Found";
		}

		Roles.addUsersToRoles(user._id, 'admin', Roles.GLOBAL_GROUP);

		return input + " is now an admin";
	},
	'Admin.removeFromEmail': function(input) {

		if (!Meteor.user()) {
			return 'Access Denied';
		}
		// Check if user is an admin
		if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
			return "Access Denied";
		}

		// var user = Accounts.findUserByEmail(input)
		// Accounts.findUserByEmail does not work with third party oauth.
		var user = Meteor.users.find({"services.google.email": input}).fetch()[0] ||
								Meteor.users.find({"services.twitter.email": input}).fetch()[0] ||
								Meteor.users.find({"services.facebook.email": input}).fetch()[0];
				user = user || Accounts.findUserByEmail(input);

		if (!user) {
			return "User not Found";
		}

		if (user._id === Meteor.user()._id) {
			return "Self can't be removed from admin group";
		}

		Roles.setUserRoles(user._id, [], Roles.GLOBAL_GROUP);

		return input + " is no longer an admin";
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

	},
	'Admin.banUserById': function(userId) {
		if (!Meteor.user()) {
			return 'Access Denied';
		}
		// Check if user is an admin
		if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
			return "Access Denied";
		}

		Roles.setUserRoles(userId, ['banned'], Roles.GLOBAL_GROUP);

		return "Banned."
	},
	'Admin.unbanUserById': function(userId) {
		if (!Meteor.user()) {
			return 'Access Denied';
		}
		// Check if user is an admin
		if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
			return "Access Denied";
		}

		Roles.setUserRoles(userId, [], Roles.GLOBAL_GROUP);

		return "Banned."
	}
});
