Template.calendar.onCreated(function () {
    this.subscribe('events');
    Session.setDefault("filters", []);
});

Template.calendar.onRendered(function () {
  setTimeout(function() {
    this.$(".collapsible").collapsible({
      accordion: false
    });
  }, 5000);
});

Template.calendar.helpers({
    upcomingEvents: function(){
      return Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}}, {sort: {dateEvent: 1}});

    },
    pastEvents: function(){
      return Events.find({dateEvent: {$lt:moment().startOf('day').toDate()}}, {sort: {dateEvent: -1}})
    },
    filters: function() {
      return Session.get('filters');
    }
});
Template.calendar.events({
    'keyup #search': function(event) {
        var searchString = event.currentTarget.value.toLowerCase();

        $('.template-calendar li').each(function() {
            var $this = $(this);
            var haystack = $this.text().toLowerCase();

            if(searchString.length > 0 && haystack.indexOf(searchString) >= 0) {
                $this.addClass('highlight');
            } else {
                $this.removeClass('highlight');
            }

        });
    },
    'click .details-btn': function(event) {
        var eventId = event.currentTarget.dataset.id;
        GAnalytics.event("Events","open_event_calendar");
        const params = {_id: eventId};
        const path = FlowRouter.path("eventById", params);
        Router.go(path);
    },
    'click #gather-filter-btn': function(event) {
        var $search = $("#search");
        var filter = $search.val()
        var filters = Session.get("filters");

        if (filter.length > 0 && filters.indexOf(filter) === -1) {
          filters.push(filter);
          Session.set("filters", filters);
          $search.val('');
          // 
          // var events = Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}}, {sort: {dateEvent: 1}});
          //
          // console.log(events);
        }
    },
    'click .remove-gather-filter': function(event) {
        var tag = $(event.currentTarget).parent().text();
        var filters = Session.get('filters');
        filters.splice(filters.indexOf(tag.trim()), 1);
        Session.set("filters", filters);
    }
});
