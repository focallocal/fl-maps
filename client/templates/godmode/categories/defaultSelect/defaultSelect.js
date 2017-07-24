Template.defaultSelect.onCreated(function() {
	this.subscribe("categories.raw");
});

function setDefaultCategory(id) {
	Meteor.call('Categories.setDefault', id, function(err, result) {
		Materialize.toast(result, 4000);
	});
}

Template.defaultSelect.helpers({
	categories: function() {
		return Categories.find({approved: true});
	}
});

Template.defaultSelect.events({
	'click .select-default': function(e) {
		setDefaultCategory(e.currentTarget.value);
	}
});
