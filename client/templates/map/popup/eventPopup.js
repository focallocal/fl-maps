Template.eventPopup.onCreated=function() {
    $('.edit-btn','#eventPopup').click(function(){
        slidePanel.showPanel('eventsEdit');
    });

    $('.remove-btn','#eventPopup').leanModal();

};
