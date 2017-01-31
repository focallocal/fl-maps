SequenceForm = function SequenceForm(formId, nextBtn) {
	this._formId = formId;
	this._nextBtn = nextBtn;
	this._$fields = {};
	this._currentField = {
		valid: false,
		number: 0
	};
}

SequenceForm.prototype.init = function(validationCallBack) {
	// Initializes the sequence
	var vm = this;

	vm._$formId = $(vm._formId);
	vm._$nextBtn = $(vm._nextBtn);
	vm._validate = validationCallBack;

	// Disable next btn
	vm._$nextBtn.attr('disabled','disabled');

	var fields = vm._$formId.find('.sequence-field');

	fields.each(function(elem) {
		var $elem = $(fields[elem]);
		var val = $elem.val();
		vm._$fields[val] = $elem;
		if (vm._currentField.number !== val) {
			// TODO: Add trasition when showing and hiding
			$elem.hide();
		}
	});

	vm._checkInit();
};

SequenceForm.prototype._checkInit = function() {
	// Checks that everything that's needed is defined
	var vm = this;

	if (
		vm._$formId === undefined ||
		vm._$nextBtn === undefined ||
		vm._$fields[0] === undefined ||
		vm.validate === undefined
	) {
		console.error("Something went wrong with SequenceForm.init");
		return false;
	}

	return true;
};

SequenceForm.prototype.next = function () {
	// Next field in sequence
	var vm = this;
};

SequenceForm.prototype.enableSubmit = function() {
	// Enables submit
	var vm = this;

};

SequenceForm.prototype.resetSequence = function() {
	// Returns to the beguining of the form
	var vm = this;
};

SequenceForm.prototype.back = function() {
	// Goes back to the previous field in sequence
	var vm = this;
}
