Template.users.onCreated(function() {
	this.subscribe("adminaccess.users");

	this.search = new ReactiveVar('');
});


Template.users.helpers({
	users: function() {
		var search = Template.instance().search.get();
		if (search === '/.*.*/' || search === '') {
			return Meteor.users.find({});
		} else {
			return Meteor.users.find({$or: [
				{'services.google.email': {'$regex': search}},
				{'services.facebook.email': {'$regex': search}},
				{'services.twitter.email': {'$regex': search}},
				{'profile.name': {'$regex': search}},
				{'roles.__global_roles__': {'$regex': search}}
			]});
		}
	}
});

Template.users.events({
	'keyup #user-search': function(event, template) {
		var val = '.*' + $(event.currentTarget).val() + '.*';
		template.search.set(val);
	}
});
