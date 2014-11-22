Template.results.helpers({
    search_results: function () {
        return Session.get('results')
    }
});

Template.banner.events({
    "submit .search-events": function (event) {
        var search_value = event.target.search.value;
        if (!search_value) return false;
        search_results = getResults(search_value);
        Session.set('results', search_results);
        event.target.search.value = "";
        return false;
    }
});

function getResults(keyword) {
    var events = Events.find({title: keyword}).fetch();
    // events.sort(hasLatestVariation);
    console.log("keyword: " + keyword);
    console.log("results: " + events);
    return events;
}