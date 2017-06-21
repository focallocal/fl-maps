
iniinitLifetime = function(parentForm, scrollTarget, timeSelectContainer) {
	function equalTimesCheck($oneTimeEvent) {
		var $timesEqual = $(parentForm + " .times-equal");
		var $dayTimes = $(parentForm + " .day-times");

		if ($timesEqual.is(":checked") === true) {
			$dayTimes.hide();
			$oneTimeEvent.show();
		} else {
			$oneTimeEvent.hide();
			// Enable single day times
			$dayTimes.each(function(index) {
				var $elem = $($dayTimes[index]);
				if ($elem.parent().find('input[type="checkbox"]').is(':checked') === true) {
					$elem.show();
				} else {
					$elem.hide();
				}
			});
		}
	}

	function weekEnableCheck() {
		var $oneTimeEvent = $(parentForm + " .one-time-event");
		var $weekEvent = $(parentForm + " .week-event");

		if ($(parentForm + " .week_enable_check").is(":checked") === false) {
			$oneTimeEvent.show();
			$weekEvent.hide();
		} else {
			$oneTimeEvent.hide();
			$weekEvent.show();
			equalTimesCheck($oneTimeEvent);
		}
	}

	function repeatingEnableCheck() {
		var $repeatingEvent = $(parentForm + " .repeating-event");
		if ($(parentForm + " .repeating_enable_check").is(":checked") == false) {
			$repeatingEvent.hide();
		} else {
			$repeatingEvent.show();
		}
	}

	function frequencyMonthly() {
		var $monthlyDetail = $(parentForm + " .monthly_detail");
		if ($(parentForm + " .frequency[value=Monthly]").is(":checked") === true) {
			$monthlyDetail.show();
		} else {
			$monthlyDetail.hide();
		}
	}

	weekEnableCheck();
	repeatingEnableCheck();
	frequencyMonthly();

	$(parentForm + " .week_enable_check").on('click', function() {
		weekEnableCheck();
	});

	$(parentForm + " .repeating_enable_check").on('click', function() {
		repeatingEnableCheck();
	});

	$(parentForm + " .frequency[value=Monthly]").parent().parent().on('click', function() {
		frequencyMonthly();
	});

	$(parentForm + " .forever_enable").on('click', function() {
		$(parentForm + " .lifetime_weeks").toggle();
	});

	$(parentForm + " .day-enable").on('click', function() {

		if ($(parentForm + " .times-equal").is(':checked') == false) {
			var $this = $(this);
			var $times = $this.parents(".day-inputs").find(".day-times");

			if ($this.is(":checked") === true) {
				$times.show();
			} else {
				$times.hide();
			}
		}
	});

	var $dayInputs = $(parentForm + " .day-inputs");

	$dayInputs.each(function(elem) {
		var $elem = $($dayInputs[elem]);
		$elem.find("label").first().text($elem.attr("value"));
	});

	$(parentForm + " .times-equal").on('click', function() {
		equalTimesCheck($(parentForm + " .one-time-event"));
	});
	// Set required labels
	var $inputs = $(parentForm + " .required-label-tag");
	$inputs.each(function(index) {
		var $input = $($inputs[index]);
		$input.siblings('label').css({'color': 'red'});
	});

	$(parentForm + " .picker__input").on('click', function() {
		var $scrollTarget = $(scrollTarget);
		// var $scrollPositionTarget = $(scrollPositionTarget);
		// var $heightBase = $(heightBase);

		// Fix Height
		// $("#" + $(this).attr("id") + "_root").find('.picker__holder').height($heightBase.height());

		// Scroll to picker (window.location.hash does not work)

		$scrollTarget.scrollTop(0);
	});

	var $timeInput = undefined;
	var options = function() {
		var timeArr = [];
		for (var hour = 8; hour < 24; ++hour) {
			['00', '30'].forEach(function (minutes) {
				var time = hour + ':' + minutes;
				timeArr.push({time: time});
			});
		}
		return timeArr;
	}();

	// Initialize the mobile friendly selection UI
	var timesSelection = new OptionSelect(function(selected) {
		$timeInput.val(selected.time);
	}, timeSelectContainer, options);

	// Activate time selection on click (OptionSelect)
	$("input.selection-trigger-time").on('click', function(e) {
		e.preventDefault();
		timesSelection.open();
		$timeInput = $(this);
		$(scrollTarget).scrollTop(0);
		return false;
	});

	$("input.selection-trigger-time").on('keydown', function(e) {
		e.preventDefault();
		return false;
	});

	$("input.selection-trigger-time").on("change", function(e) {
		var $this = $(this);
		if (options.indexOf($this.val()) === -1) {
			$this.val('Pick a Time!');
		}
	});
}
