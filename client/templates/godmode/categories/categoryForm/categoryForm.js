AutoForm.hooks({
	 'new-category-form': {
			 onSuccess: function (operation, result, template) {
				 	// TODO: Close modal
					 $("#newCategoryFormClose").click();
					 Materialize.toast('Category Added!', 4000);

					 GAnalytics.event("Category","created");
			 },
			 onError: function(formType, error) {
					 GAnalytics.event("Category","form_error");
					 console.error(error);
			 }
	 }
});

function clearForm() {
	AutoForm.resetForm('new-category-form');
}

Template.categoryForm.onCreated(function() {
	this.subscribe('categories');
	this.categories = [];
	var instance = this;

	Tracker.autorun(function() {
		instance.categories = Categories.find({}).fetch();
	});
});

Template.autoForm.onRendered(function() {
	if (this.data.id !== "new-category-form") {
		return;
	}
	
	$("#category-color").spectrum({
		color: "#000",
		preferredFormat: "hex"
	});
});

Template.categoryForm.viewmodel({
	clearForm: clearForm
});
