Template.newEvent.helpers({
 createCoords: function () {
     return Session.get("createCoords");
 }
});
Template.newEvent.events({
   'click .special': function (event, template) {
       var title = template.find("#title").value;
       var city = template.find("#city").value;
       var location = template.find("#location").value;
       var dateEvent = template.find("#dateEvent").value;
       var hyperlink = template.find("#hyperlink").value;
       var category = template.find("#category").value;
       var description = template.find("#description").value;
       var latlng = Session.get("createCoords");

       if (title.length && location.length && city.length &&
           hyperlink.length && category.length &&
           description.length && dateEvent.length) {
           Meteor.call('createEvent', {
                title: title,
                city : city,
                location : location,
                dateEvent : dateEvent,
                hyperlink : hyperlink,
                category : category,
                description : description,
                latlng : latlng
           }, function (error, event)  {
              if (! error) {
                  $("#newEvent").modal("hide");
                  Session.set('selected', event);
                  Session.set("newEventError", null);
              } else {
                  Session.set("newEventError", error.reason);
              }
           });
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