Template.autoForm.onRendered(function() {

	function equalTimesCheck($oneTimeEvent) {
		var $timesEqual = $("#times-equal");
		var $dayTimes = $(".day-times");

		if ($timesEqual.is(":checked") === true) {
			$dayTimes.hide();
			$oneTimeEvent.show();
		} else {
			$oneTimeEvent.hide();
		}
	}

	function weekEnableCheck() {
		var $oneTimeEvent = $("#one-time-event");
		var $weekEvent = $("#week-event");

		if ($("#week_enable_check").is(":checked") === false) {
			$oneTimeEvent.show();
			$weekEvent.hide();
		} else {
			$oneTimeEvent.hide();
			$weekEvent.show();
			equalTimesCheck($oneTimeEvent);
		}
	}

	function repeatingEnableCheck() {
		var $repeatingEvent = $("#repeating-event");
		if ($("#repeating_enable_check").is(":checked") == false) {
			$repeatingEvent.hide();
		} else {
			$repeatingEvent.show();
		}
	}

	function frequencyMonthly() {
		var $monthlyDetail = $("#monthly_detail");
		if ($("#frequency_Monthly").is(":checked") === true) {
			$monthlyDetail.show();
		} else {
			$monthlyDetail.hide();
		}
	}

	weekEnableCheck();
	repeatingEnableCheck();
	frequencyMonthly();

	$('#week_enable_check').on('click', function() {
		weekEnableCheck();
	});

	$("#repeating_enable_check").on('click', function() {
		repeatingEnableCheck();
	});

	$(".day-times").hide();

	$('#frequency_Monthly').parent().parent().on('click', function() {
		frequencyMonthly();
	});

	$("#forever_enable").on('click', function() {
		$("#lifetime_weeks").toggle();
	});

	$(".day-enable").on('click', function() {

		if ($("#times-equal").is(':checked') == false) {
			var $this = $(this);
			var $times = $this.parents(".day-inputs").find(".day-times");

			if ($this.is(":checked") === true) {
				$times.show();
			} else {
				$times.hide();
			}
		}
	});

	var $dayInputs = $(".day-inputs");

	$dayInputs.each(function(elem) {
		var $elem = $($dayInputs[elem]);
		$elem.find("label").first().text($elem.attr("id"));
	});

	$("#times-equal").on('click', function() {
		equalTimesCheck($("#one-time-event"));
	});

	// Set required labels
	var $inputs = $(".required-label-tag");
	$inputs.each(function(index) {
		var $input = $($inputs[index]);
		$input.siblings('label').css({'color': 'red'});
	});
});
