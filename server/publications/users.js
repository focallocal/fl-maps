Meteor.publish("adminaccess.users", function() {

	// Allow admins only
	if (!this.userId) {
		this.ready();
		return;
	}

	if (!Roles.userIsInRole(this.userId, ['admin'])) {
		this.ready();
		return;
	}

	// Admin authenticated
	return Meteor.users.find({}, {fields: {createdAt: 1, profile: 1, 'services.google.email': 1, 'services.twitter.email': 1, 'services.facebook.email': 1, roles: 1}});

});
