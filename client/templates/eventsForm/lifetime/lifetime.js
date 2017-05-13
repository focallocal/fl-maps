Template.autoForm.onRendered(function() {

	if ($("#week_enable_check").is(":checked") === false) {
		$("#week-event").hide();
	} else {
		$("#one-time-event").hide();
	}

	if ($("#repeating_enable_check").is(":checked") == false) {
		$("#repeating-event").hide();
	} else {
		$("#repeating-event").show();
	}

	if ($("#frequency_Monthly").is(":checked") === true) {
		$("#monthly_detail").show();
	} else {
		$("#monthly_detail").hide();
	}

	$('#week_enable_check').on('click', function() {
		$("#one-time-event").toggle();
		$("#week-event").toggle();
	});

	$("#repeating_enable_check").on('click', function() {
		$("#repeating-event").toggle();
	});

	$(".day-times").hide();

	$('#frequency_Monthly').parent().parent().on('click', function() {
		if($('#frequency_Monthly').is(':checked')) {
			$("#monthly_detail").show();
		} else {
			$("#monthly_detail").hide();
		}
	});

	$("#lifetime_weeks").hide();
	$("#forever_enable").on('click', function() {
		$("#lifetime_weeks").toggle();
	});

	$(".day-enable").on('click', function() {
		var $this = $(this);
		var $times = $this.parents(".day-inputs").find(".day-times");

		if ($this.is(":checked") === true) {
			$times.show();
		} else {
			$times.hide();
		}
	});

	var $dayInputs = $(".day-inputs");

	$dayInputs.each(function(elem) {
		var $elem = $($dayInputs[elem]);
		$elem.find("label").first().text($elem.attr("id"));
	});
});
