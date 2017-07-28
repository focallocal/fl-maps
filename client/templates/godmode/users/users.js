Template.users.onCreated(function() {
	this.subscribe("adminaccess.users");
});


Template.users.helpers({
	users: function() {
		return Meteor.users.find({});
	}
});
