Template.categories.onCreated(function() {
	this.subscribe("categories.raw");
});


Template.categories.helpers({
	categories: function() {
		return Categories.find({});
	}
});

Template.categories.events({
	'click .toggle-approval-category': function() {
		Meteor.call('Categories.approveToggle', this._id);
	},
	'click .remove-category': function() {
		Meteor.call('Categories.remove', this._id);
	},
	'click #newCategory': function() {
		$("#categoryFormModal").openModal({
			dismissible: false
		});
	},
	'click #set-default': function() {
		$("#defaultSelectModal").openModal({
			dismissible: false
		})
	}
});
