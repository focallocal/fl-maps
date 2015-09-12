Template.eventPopup.onCreated=function() {
    $('.edit-btn','#eventPopup').click(function(){
        Session.set('isEdit', true);
        slidePanel.showPanel('eventsForm');
    });

    $('.remove-btn','#eventPopup').leanModal();

};
