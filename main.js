Events = new Mongo.Collection("events");

if (Meteor.isClient) {

  Template.results.helpers({
     search_results: function () {
         return Session.get('results')
     }
  });

  Template.banner.events({
    "submit .search-events": function (event) {
      var search_value = event.target.search.value;
      search_results = getResults(search_value);
      Session.set('results', search_results);
      event.target.search.value = "";
      return false;
    }
  });

  function getResults(keyword) {
    var events = Events.find({event_name: keyword}).fetch();
    // events.sort(hasLatestVariation);
    console.log("keyword: " + keyword);
    console.log("results: " + events);
    return events;
  }

//resize map on window frame size change
    $(window).resize(function(){
        var h = $(window).height();
        var offsetTop = 90;
        $mc = $('#map_canvas');
        $mc.css('height',(h-offsetTop));
    }).resize();
}
//global
Meteor.methods({
    createEvent: function (options) {
        console.log('trying to save event');
        if (! (typeof options.title === "string" && options.title.length &&
            typeof options.location === "string" && options.location.length &&
            typeof options.artifact === "string" && options.artifact.length &&
            typeof options.category === "string" && options.category.length &&
            typeof options.description === "string" && options.description.length
            ))
            throw new Meteor.Error(400, "Required parameter missing");
        if (options.title.length > 100)
            throw new Meteor.Error(413, "Event name too long");
        if (options.location.length > 100)
            throw new Meteor.Error(413, "Location too long");
        if (options.artifact.length > 100)
            throw new Meteor.Error(413, "Item name too long");
        if (options.category.length > 100)
            throw new Meteor.Error(413, "Category too long");
        if (options.description.length > 2000)
            throw new Meteor.Error(413, "Description too long");
        //@TODO
        //if (! this.userId)
        //    throw new Meteor.Error(403, "You must be logged in");
        return Events.insert({
            owner: "Mordka",
            latlng: options.latlng,
            title: options.title,
            location: options.location,
            artifact: options.artifact,
            category: options.category,
            description: options.description,
            datePublished: Date.now(),
            dateEvent: Date.now()
        });
    }
});



