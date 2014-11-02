Events = new Mongo.Collection("events");

if (Meteor.isClient) {
  // This code only runs on the client

  Template.body.helpers({
    // search_results: getResults("pillow")

  });
  Template.body.events({
    "submit .search-events": function (event) {
      var search_value = event.target.search.value;
      search_results = getResults(search_value);
      event.target.search.value = "";
      return false;
    }

   });
  // Template.results.events({
  //   "click .toggle-checked": function () {
  //     Events.update(this._id, {$set: {checked: ! this.checked}});
  //   },
  //   "click .delete": function () {
  //     Events.remove(this._id);
  //   }
  // })
}
function getResults(keyword) {
    var events = Events.find({event_name: keyword}).fetch();
    // events.sort(hasLatestVariation);
    console.log("keyword: " + keyword);
    console.log("results: " + events);
    return events;
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
