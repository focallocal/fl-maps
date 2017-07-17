Template.optionSelect.optionsData = new ReactiveVar({});

OptionSelect = function OptionSelect(optionSelectFunction, id, options) {
	this.optionSelect = optionSelectFunction;
	this.containerId = id;
	this.options = options;

	Template.optionSelect.optionsData.set(this);
}

OptionSelect.prototype.forceSetData = function (instance) {
	Template.optionSelect.optionsData.set(instance);
};

OptionSelect.prototype.open = function() {
	$(this.containerId).show();
};

Template.optionSelect.helpers({
	options: function() {
		return Template.optionSelect.optionsData.get().options;
	}
});

Template.optionSelect.events({
	'click .option-select__selection': function() {
		var obj = Template.optionSelect.optionsData.get();
		obj.optionSelect(this);
		$(obj.containerId).hide();
	},
	'click #option-select-close': function() {
		$(Template.optionSelect.optionsData.get().containerId).hide();
	}
});
