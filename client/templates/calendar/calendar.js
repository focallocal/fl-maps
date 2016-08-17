Template.calendar.onCreated(function () {
    this.subscribe('events');
    
});

Template.calendar.onRendered(function () {
  this.$('.collapsible').collapsible({
      accordion : true
  });
});
Template.calendar.helpers({
    upcomingEvents: function(){
      return Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}}, {sort: {dateEvent: 1}});
    },
    pastEvents: function(){
      return Events.find({dateEvent: {$lt:moment().startOf('day').toDate()}}, {sort: {dateEvent: -1}})
    }
});
Template.calendar.events({
    'keyup #search': function(event) {
        var searchString = event.currentTarget.value.toLowerCase();

        $('.template-calendar li').each(function() {
            var haystack = $(this).text().toLowerCase();
            if(searchString.length > 0 && haystack.indexOf(searchString) >= 0) {
                $(this).addClass('highlight');
            } else {
                $(this).removeClass('highlight');
            }
        });
    },
    'click .details-btn': function(event) {
        var eventId = event.currentTarget.dataset.id;
        GAnalytics.event("Events","open_event_calendar");
        const params = {_id: eventId};
        const path = FlowRouter.path("eventById", params);
        Router.go(path);
    }
});
