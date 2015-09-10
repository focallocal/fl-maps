Template.calendar.helpers({
    notEmpty: function(data) {
        return data && data.count() != 0;
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
    }
});
Template.calendar.rendered=function() {
    $('.collapsible').collapsible({
        accordion : true
    });
};
