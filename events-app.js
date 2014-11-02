Events = new Mongo.Collection("events");

if (Meteor.isClient) {
  // This code only runs on the client

  Template.body.helpers({
    events: function () {
      return Events.find({},{sort:{createdAt: -1}});
    }

  });

  Template.body.events({

    "submit .new-event": function (event) {
      console.info(event)
      var text = event.target.text.value;
      Events.insert({
        event_name: text,
        createdAt: new Date()
      });
      event.target.text.value = "";

      return false;
    }

   });
  Template.event.events({
    "click .toggle-checked": function () {
      Events.updaet(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function () {
      Events.remove(this._id);
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
