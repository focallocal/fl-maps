Template.eventPopup.onCreated=function() {
    $('.edit-btn','#eventPopup').click(function(){
        slidePanel.showPanel('eventsForm',{isEdit:true});
    });

    $('.remove-btn','#eventPopup').leanModal();

};
