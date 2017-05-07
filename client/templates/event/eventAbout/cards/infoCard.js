Template.infoCard.helpers({
	weekArray: function(week) {
		var weekArray = [];
		for (var key in week) {
			var name = key.charAt(0).toUpperCase() + key.slice(1);
			weekArray.push({name: name, day: week[key]});
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
