SequenceForm = function SequenceForm(formId, nextBtn, submitBtn, backBtn) {
	this._formId = formId;
	this._nextBtn = nextBtn;
	this._submitBtn = submitBtn;
	this._backBtn = backBtn;

	this._fieldAmount = 0;

	this._$fields = {};
	this._currentField = {
		valid: false,
		number: 0
	};
}

SequenceForm.prototype.init = function() {
	// Initializes the sequence
	var vm = this;

	vm._$formId = $(vm._formId);
	vm._$nextBtn = $(vm._nextBtn);
	vm._$submitBtn = $(vm._submitBtn);
	vm._$backBtn = $(vm._backBtn);

	// Disable back btn
	vm._$backBtn.attr('disabled','disabled');

	// Bind back btn
	vm._$backBtn.on('click', function() {
		vm.back();
	});

	// Disable next btn
	// vm._$nextBtn.attr('disabled','disabled');

	// Hide submit btn
	vm._$submitBtn.hide();

	// Bind next btn
	vm._$nextBtn.on('click', function() {
		vm.next();
	});

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

	vm._fieldAmount = fields.length;


	// vm._checkInit();
};

// SequenceForm.prototype._checkInit = function() {
// 	// Checks that everything that's needed is defined
// 	var vm = this;
//
// 	if (
// 		vm._$formId.length === 0 ||
// 		vm._$nextBtn.length === 0 ||
// 		vm._$submitBtn.length === 0 ||
//
// 		vm._fieldAmount === undefined ||
// 		vm._$backBtn.length === 0
// 	) {
// 		console.error("Something went wrong with SequenceForm.init");
// 		return false;
// 	}
//
// 	return true;
// };

SequenceForm.prototype.next = function (skip) {
	// Next field in sequence
	var vm = this;

	if (vm._fieldAmount - 1 === vm._currentField.number) {
		return;
	}


	var $currentField = vm._$fields[vm._currentField.number];

	if (vm.beforeNextCall !== undefined && !skip) {
		vm._$nextBtn.attr('disabled','disabled');
		if (!vm.beforeNextCall($currentField)) {
			vm._$nextBtn.removeAttr('disabled');
			return;
		}
		vm._$nextBtn.removeAttr('disabled');
	}

	vm._currentField.number += 1;
	var $nextField = vm._$fields[vm._currentField.number];

	// TODO: Add animations
	$currentField.hide();
	$nextField.show();

	if (vm._fieldAmount - 1 === vm._currentField.number) {
		// Hide next button on last step
		vm._$nextBtn.addClass('hide');
		vm._$submitBtn.show();
	}

	// Enable back btn
	vm._$backBtn.removeAttr('disabled');

};

SequenceForm.prototype.back = function() {
	// Back
	var vm = this;

	if (vm._currentField.number === 0) {
		// Disable back btn
		vm._$backBtn.attr('disabled','disabled');
		return;
	}

	if (vm.beforeBackCall !== undefined) {
		vm.beforeBackCall(vm._currentField);
	}

	var $currentField = vm._$fields[vm._currentField.number];
	vm._currentField.number -= 1;
	var $nextField = vm._$fields[vm._currentField.number];

	vm._$nextBtn.removeClass('hide');
	vm._$nextBtn.removeAttr('disabled');
	vm._$submitBtn.hide();

	if (vm._currentField.number === 0) {
		// Disable back btn
		vm._$backBtn.attr('disabled','disabled');
	}

	// TODO: Add animations
	$currentField.hide();
	$nextField.show();

};

SequenceForm.prototype.setBeforeNextTrigger = function(func) {
	var vm = this;
	vm.beforeNextCall = func;
};

SequenceForm.prototype.setBeforeBackTrigger = function(func) {
	var vm = this;
	vm.beforeBackCall = func;
};

SequenceForm.prototype.resetSequence = function() {
	var vm = this;
	var $currentField = vm._$fields[vm._currentField.number];
	vm._currentField.number = 0;
	var $firstField = vm._$fields[vm._currentField.number];

	$currentField.hide();
	$firstField.show();

	vm._$nextBtn.removeAttr('disabled');
	vm._$backBtn.attr('disabled','disabled');
	vm._$submitBtn.hide();
};
