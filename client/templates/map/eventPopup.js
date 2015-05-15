Template.eventPopup.onCreated=function() {

        var eventId = Session.get('selected');
        var $popup = $('#popup-'+eventId);
        console.log("Attaching events..");
        console.log('template rendreed ' + eventId);
        console.log('popup ' + $popup[0]);

        $popup.click('edit-event',function (e) {
            e.stopPropagation();
            e.preventDefault();
            slidePanel.showPanel('eventsEdit');
        });
        $popup.click('remove-event',function () {
            Events.remove(eventId);
        });

    //    this.rendered = true;
    //}
};

//TODO when to call this?
Template.eventPopup.onDestroyed=function() {
    console.log("Removing binded event handlers from edit/remove buttons...");
    $('.edit-event').unbind();
    $('.remove-event').unbind();
};