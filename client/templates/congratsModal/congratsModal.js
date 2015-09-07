Template.congratsModal.helpers({
    shareData: function() {
        var eventId = Session.get('selected');
        console.log('getting selected event ' + eventId);
        var event = Events.findOne(eventId);  
        if (event == undefined) {
        	Meteor.Error('no-event-selected', 'No event selected.');
        	return;
        }
        // Template.congratsModal.onCreated();
        return { 
        	title: event.name,
        	author: event.organiser.name,
        	excerpt: event.description,
        	url: event.url

        }
	},
	shareOnFacebookLink: function(url) {
		return 'https://www.facebook.com/sharer/sharer.php?&u=' + url;
	},
	shareOnTwitterLink: function(url,title) {
		return 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
	},
	shareOnGooglePlusLink: function(url) {
		return 'https://plus.google.com/share?url=' + url;
	}
});
