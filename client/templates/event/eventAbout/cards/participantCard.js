

Template.participantCard.onCreated(function() {
	this.participationInfo = new ReactiveVar({});
	this.userId = Meteor.user() || {_id: ''};
	this.userId = this.userId._id;

	instance = this;

	this.reloadParticipationInfo = function() {
		var selectedEventId = Session.get('selected');
		Meteor.call('Events.getEngagement', selectedEventId, instance.userId, function(error, result) {
			instance.participationInfo.set(result);
		});
	}

	Tracker.autorun(instance.reloadParticipationInfo);
});

Template.participantCard.helpers({
	participationInfo: function() {
		return Template.instance().participationInfo.get();
	},
	userId: function() {
		return Template.instance().userId;
	}
});

Template.participantCard.events({
	'click #willAttend': function() {
		if (Meteor.user() === null) {
			Materialize.toast("You must be logged in!", 4000);
			return;
		}

		var selectedEventId = Session.get('selected');
		var userId = Meteor.user()._id;

		Meteor.call('Events.engage', selectedEventId, userId, true, function(error, result) {
			Materialize.toast(result, 4000);
		});

		Template.instance().reloadParticipationInfo();

		GAnalytics.event("Events","attend");
	},
	'click #willNotAttend': function() {
		if (Meteor.user() === null) {
			Materialize.toast("You must be logged in!", 4000);
			return;
		}

		var selectedEventId = Session.get('selected');
		var userId = Meteor.user()._id;

		Meteor.call('Events.engage', selectedEventId, userId, false, function(error, result) {
			Materialize.toast(result, 4000);
		});

		Template.instance().reloadParticipationInfo();

		GAnalytics.event("Events","notAttend");
	}
});
