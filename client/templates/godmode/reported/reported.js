Template.reported.onCreated(function() {
	this.subscribe("events");
});

Template.reported.helpers({
	events: function() {
		return Events.find({"reported.status": true}).fetch();
	},
	sample: function() {
		return {name: "Sample", address: "Sampleland", organiser: {
			name: "Mr. Sample"
		}, category: {name: "Samples"}, overview: "Nice"};
	}
});
