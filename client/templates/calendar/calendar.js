Template.calendar.helpers({
    notEmpty: function(data) {
        return data.count() != 0;
    }
});

Template.calendar.rendered=function() {
    $('.collapsible').collapsible({
        accordion : true
    });
}
