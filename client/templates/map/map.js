var markerCluster = null;
var markers = {};

function adjustMapHeightToWindowSize($mapCanvas) {
	$(window).resize(function () {
	    var h = $(this).height(),
	        offsetTop = $('#menu-top').height();
	    $mapCanvas.css('height', (h - offsetTop));
	}).resize();
}

function initNewEventButton() {
	var $newEventBtn = $('#event-new-btn');
	$($newEventBtn,'.tooltipped').tooltip({delay: 50});
	$newEventBtn.click(function () {
		if (!Meteor.userId()) {
			var toastTimeout = 3000;
			Materialize.toast('Oops! Please login to add gather!', toastTimeout);
		} else {
			Session.set('isEdit',false);
			$("#eventsFormModal").openModal({
				dismissible: true
			});
		}
	}).trigger('mouseenter');
	$('body').click(function() {
	    $newEventBtn.trigger('mouseleave');
	})
}

function createPopupContent(event) {
	return Blaze.toHTMLWithData(Template.eventPopup, event);
}

function setCluster(map) {
	if (markerCluster !== null) {
		markerCluster.setMap(null);
		markerCluster = null;
	}

	var markersForCluster = [];
	for (var layer in markers) {
		if (markers.hasOwnProperty(layer)) {
			for (var marker in markers[layer]) {
				if (markers[layer].hasOwnProperty(marker)) {
					markersForCluster.push(markers[layer][marker]);
				}
			}
		}
	}

	markerCluster = new MarkerClusterer(map, markersForCluster, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

function addMarker(event, map) {
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(event.coordinates.lat, event.coordinates.lng),
		map: map
	});

	marker.addListener('click', function() {
		var infoWindow = new google.maps.InfoWindow({
			content: createPopupContent(event)
		});
		infoWindow.open(map, this);
	});

	markers[event.category.name] = markers[event.category.name] || {};
	markers[event.category.name][event._id] = marker;
}

function removeMarker(event) {
	if (markers[event.category.name] !== undefined) {
		var marker = markers[event.category.name][event._id];
		marker.setMap(null);

		marker.unbind('click', false);

		markers[event.category.name][event._id] = undefined;
	}
}

Template.map.onCreated(function() {
	var instance = this;

	instance.subscribe('events');
	instance.subscribe('categories');

	instance.events = new ReactiveVar([]);
	instance.categories = new ReactiveVar([]);

	GoogleMaps.ready('map', function(map) {

		adjustMapHeightToWindowSize($('.map-container'));

		instance.events.get().forEach(function(event) {
			addMarker(event, map.instance);
			// Watch for new events
			var cursor = Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}});
			cursor.observe({
				added: function(event) {
					addMarker(event);
					setCluster(map.instance);
				},
				changed: function(newEvent, oldEvent) {
					removeMarker(oldEvent);
					addMarker(newEvent, map.instance);
					setCluster(map.instance);
				},
				removed: function(event) {
					removeMarker(event);
				}
			});
		});

		setCluster(map.instance);

	});
});


Template.map.onRendered(function() {
	GoogleMaps.load({key: "AIzaSyAbKJHLD4QLHnp-nmA37RJpZHQC0qbpba4"});
});

Template.map.helpers({
	mapOptions: function() {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(0, 0),
				zoom: 3
			}
		}
	},
	mapData: function() {
		Template.instance().categories.set(Categories.find({}));
		Template.instance().events.set(Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}}));
	}
});

GoogleMaps.ready('map', function(map) {
	GoogleMaps.initialize();
	initNewEventButton();
});

Template.map.viewmodel({
	panTo: function() {

	}
});


Template.map.onDestroyed(function() {
	markers = {};
	markerCluster = {};
});
