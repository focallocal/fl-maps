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


