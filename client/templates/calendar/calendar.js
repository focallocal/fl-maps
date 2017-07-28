Template.calendar.onCreated(function () {
    this.subscribe('events');

    this.filters = new ReactiveVar([]);
});

Template.calendar.onRendered(function () {
  setTimeout(function() {
    this.$(".collapsible").collapsible({
      accordion: false
    });
  }, 5000);
});

// General Functions
function filterEvents(events, filters) {
  filters.forEach(function(f) {
    for (var i = events.length - 1; i >= 0; i--) {
      var event = events[i];
      var searchBase = event.address +
                      event.organiser +
                      event.meetingPoint +
                      event.description +
                      event.category.name;

      if (searchBase.toLowerCase().indexOf(f.toLowerCase()) === -1) {
        events.splice(i, 1);
      }
    }
  });
  // Fixes unresponsive events in the calendar
  setTimeout(function() {
    this.$(".collapsible").collapsible({
      accordion: false
    });
  }, 5000);
  return events;
}

Template.calendar.helpers({
    upcomingEvents: function() {
      var events = Events.find({"$or": [{dateEvent: {$gte:moment().startOf('day').toDate()}}, {'repetition.lifetime_date': {$gte:moment().startOf('day').toDate()}}, {'repetition.forever_enable': true}]}, {sort: {dateEvent: 1}}).fetch();

      var filters = Template.instance().filters.get();

      if (filters.length > 0) {
        return filterEvents(events, filters);
      } else {
        setTimeout(function() {
          this.$(".collapsible").collapsible({
            accordion: false
          });
        }, 5000);
      }

      return events;
    },
    pastEvents: function(){
      var events = Events.find({"$and": [{dateEvent: {$lt:moment().startOf('day').toDate()}}, {"$or": [{'repetition.lifetime_date': {$lt:moment().startOf('day').toDate()}}, {'week_enable': false}]}]}, {sort: {dateEvent: -1}}).fetch();

      var filters = Template.instance().filters.get();

      if (filters.length > 0) {
        return filterEvents(events, filters);
      } else {
        setTimeout(function() {
          this.$(".collapsible").collapsible({
            accordion: false
          });
        }, 5000);
      }

      return events;
    },
    filters: function() {
      return Template.instance().filters.get();
    },
    unapprovedCategories: function() {
      return Categories.find({'approved': false});
    },
    isAdmin: function() {
      return false;
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
        FlowRouter.go(path);
    },
    'click #gather-filter-btn': function(event, template) {
        var $search = $('#search');
        var filter = $search.val();
        var filters = template.filters.get();

        if (filter.length > 0 && filters.indexOf(filter) === -1) {
          filters.push(filter);
          template.filters.set(filters);
          $search.val('')
                .trigger('keyup')
                .focusout();
        }
    },
    'click .remove-gather-filter': function(event, template) {
        var tag = $(event.currentTarget).parent().text().trim();
        tag = tag.substring(0, tag.length - 2).trim();
        var filters = template.filters.get();

        filters.splice(filters.indexOf(tag), 1);
        template.filters.set(filters);
    }
});
