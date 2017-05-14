Template.infoCard.helpers({
	weekArray: function(week, time_equal, time, time_end) {
		var weekArray = [];
		for (var key in week) {
			var name = key.charAt(0).toUpperCase() + key.slice(1);
			if (time_equal === true) {
				week[key].time = time;
				week[key].time_end = time_end;
				weekArray.push({name: name, day: week[key]});
			} else {
				weekArray.push({name: name, day: week[key]});
			}
		}
		return weekArray;
	},
	frequencyValue: function(repetition) {
		if (repetition.frequency === "Monthly") {
			return "On the " + repetition.monthlyDays.toString() + " every month";
		}

		return "Repeats " + repetition.frequency;
	}
});
