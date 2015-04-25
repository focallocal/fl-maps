AutoForm.hooks({
    'items-new-form': {
        onSuccess: function(operation, result, template) {
            Materialize.toast('Item created successfully!', 4000);
            Router.go('dashboard');
        }
    }
});
Template.eventsNew.onRendered(function() {
    this.$('input[name="coordinates.lat"]').val(Template.currentData().lat);
    this.$('input[name="coordinates.lng"]').val(Template.currentData().lng);
    this.$('#events-new-form > div.item.item-divider').remove();
});
