var sequence = undefined;

Template.welcomeModal.onRendered(function() {
	sequence = new SequenceForm('#welcome-sequence', '#welcome-btn-next', '#explore-btn', '#welcome-btn-back');

	sequence.init();

	var $sequenceBtns = $("#welcome-sequence-buttons");

	$sequenceBtns.hide();

	$("#welcome-start").on('click', function() {
		sequence.next();
		$sequenceBtns.show();
	});
});
