Meteor.startup(function() {
  console.log("Layout: Meteor.startup");
  AutoForm.setDefaultTemplate('materialize');

  $('body').on('click', '[data-action=logout]', function(event) {
    event.preventDefault();
    AccountsTemplates.logout();
  });
});
