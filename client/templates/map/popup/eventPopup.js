Template.eventPopup.onCreated=function() {
    //Open share modal
    $('.promo-btn','#eventPopup').click(function(){
        $('#congratsModal').openModal({
            dismissible: false
        });
    });

    //Open event edit form
    $('.edit-btn','#eventPopup').click(function(){
        Session.set('isEdit', true);
        GAnalytics.event("Events","try_edit");
        slidePanel.showPanel('eventsForm');
    });

    //Go to event details page
    $('.details-btn','#eventPopup').click(function() {
        var eventId = Session.get('selected');
        GAnalytics.event("Events","open_event_popup");
        Router.go('event.show', {_id: eventId});
    });

    //Open modal asking to delete event
    $('.remove-btn','#eventPopup').leanModal();

};
