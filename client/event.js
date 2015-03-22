Template.newEvent.helpers({
 createCoords: function () {
     return Session.get("createCoords");
 }
});
Template.newEvent.events({
   'click .special': function (event, template) {
       var title = template.find("#title").value;
       var location = template.find("#location").value;
       var artifact = template.find("#artifact").value;
       var category = template.find("#category").value;
       var description = template.find("#description").value;
       var latlng = Session.get("createCoords");

       if (title.length && location.length &&
           category.length && category.length &&
           description.length) {
           Meteor.call('createEvent', {
               title: title,
                location : location,
                artifact : artifact,
                category : category,
                description : description,
                latlng : latlng
           }, function (error, event)  {
              if (! error) {
                  Session.set('selected', event);
              }
           });
           $("#newEvent").modal("hide");
       } else {
           Session.set("newEventError", "Please fill all required details");
       }
   }
});

Template.eventsList.helpers({
    events: function() {
        return Events.find({});
    }
});