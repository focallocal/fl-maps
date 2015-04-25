AutoForm.hooks({
    'items-new-form': {
        onSuccess: function(operation, result, template) {
            Materialize.toast('Item created successfully!', 4000);
            Router.go('dashboard');
        }
    }
});
