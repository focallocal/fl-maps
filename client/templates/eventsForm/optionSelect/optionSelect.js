var instance = null;

OptionSelect = function OptionSelect(optionSelectFunction, id, options) {
	this.optionSelect = optionSelectFunction;
	this.containerId = id;
	this.options = options;

	instance.instanceData.set(this);
}

OptionSelect.prototype.open = function() {
	$(this.containerId).show();
};

Template.optionSelect.onCreated(function() {
	this.instanceData = new ReactiveVar({});
	instance = this;
});

Template.optionSelect.helpers({
	options: function() {
		return instance.instanceData.get().options;
	}
});

Template.optionSelect.events({
	'click .option-select__selection': function() {
		var obj = instance.instanceData.get();
		obj.optionSelect(this);
		$(obj.containerId).hide();
	},
	'click #option-select-close': function() {
		$(instance.instanceData.get().containerId).hide();
	}
});
