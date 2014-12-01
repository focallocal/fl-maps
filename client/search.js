Template.results.helpers({
    search_results: function () {
        return Session.get('results')
    }
});

Template.banner.events({
    "submit .search-events": function (event) {
        var search_value = event.target.search.value;
        if (!search_value) return false;
        Session.set('results', Events.find({title: keyword}));
        event.target.search.value = "";
        return false;
    }
});
