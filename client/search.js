
Template.banner.events({
    "submit .search-events": function (event) {
        event.preventDefault();
        var search_value = event.target.search.value;
        if (!search_value) return false;
        Session.set('results', Events.find({title: search_value}));
        event.target.search.value = "";
        return false;
    }
});
