function addAdmin() {
	// Select input
	console.log("ADDING");
	var $addAdminForm = $("#enable-admin-form");
	var email = "";
}

function removeAdmin() {
	// Select input
	console.log("REMOVING");
}

Template.godmode.onCreated(function() {
});

Template.godmode.events(function() {
	'click #remove-admin-btn': removeAdmin,
	'click #add-admin-btn': addAdmin
});
