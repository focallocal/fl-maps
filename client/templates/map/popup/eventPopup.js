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
        slidePanel.showPanel('editEvent');
    });

    //Go to event details page
    $('.details-btn','#eventPopup').click(function() {
        $(".leaflet-popup").remove();
        var eventId = Session.get('selected');
        GAnalytics.event("Events","open_event_popup");
        const params = {_id: eventId};
        const path = FlowRouter.path("eventById", params);
        FlowRouter.go(path);
    });

    //Open modal asking to delete event
    $('.remove-btn','#eventPopup').leanModal();

};
