Session.setDefault('editMode',false);
Template.socialCard.events({
    'click .edit-btn': function toggleEditMode(e) {
        var currentMode = Session.get('editMode');
        Session.set('editMode', !currentMode);
    }
});
Template.socialCard.helpers({
    'isEditMode': function() {
        return Session.get('editMode');
    }
})