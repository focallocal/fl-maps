Template.congratsModal.helpers({
	selectedEvent: function() {
	  var eventId = Session.get('selected');
	  var event = Events.findOne(eventId);
	  if (event == undefined) {
	  	Meteor.Error('no-event-selected', 'No event selected.');
	  	return;
		}
		Session.set('selectedEvent', event);
		event.url = event.url ? event.url : Meteor.absoluteUrl('events/'+eventId);
		return event;
	},
	shareOnFacebookLink: function(event) {
		const prodFbApiKey = Meteor.settings.public.facebook.oauth_key;
		var url = 'http://www.facebook.com/dialog/feed?app_id='+ prodFbApiKey +
			'&link=' +Meteor.absoluteUrl('events/'+event._id)+
			'&picture=http://focallocal.org/assets/images/focallocal-logo.png' +
			'&name=' + encodeURIComponent(event.name) +
			'&caption=' + encodeURIComponent(event.category.name) +
			'&description=' + encodeURIComponent(event.description) +
			'&redirect_uri='+ Meteor.absoluteUrl() +
			'&display=popup';
		return url;
		//return 'https://www.facebook.com/sharer/sharer.php?&u=' + url;
	},
	shareOnTwitterLink: function(event) {
		var promoText = 'I\'ve just created new GatherUp! ';
		return 'https://twitter.com/intent/tweet?url=' + event.url +
			'&text=' +  encodeURIComponent(promoText) +
			encodeURIComponent(event.name) +
			'&hashtags=Focallocal';
	},
	shareOnGooglePlusLink: function(event) {
		return 'https://plus.google.com/share?url=' + event.url;
	}
});
function selectText(containerid) {
			 if (document.selection) {
					 var range = document.body.createTextRange();
					 range.moveToElementText(document.getElementById(containerid));
					 range.select();
			 } else if (window.getSelection) {
					 var range = document.createRange();
					 range.selectNode(document.getElementById(containerid));
					 window.getSelection().addRange(range);
			 }
	 }
Template.congratsModal.events({
	'click #copy-button': function() {
		selectText('selectable');
	}
});
