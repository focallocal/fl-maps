var markerCluster = null;
var markers = {};
var addedMarkers = {};
var addedLayers = {};
var eventMap = null;
var created = false;

function resetMakerData() {
	if (markerCluster !== null) {
		markerCluster.clearMarkers();
	}
	markerCluster = null;
	for (layer in markers) {
		if (markers.hasOwnProperty(layer)) {
			for (marker in markers[layer]) {
				if (markers[layer].hasOwnProperty(marker)) {
					markers[layer][marker].setMap(null);
				}
			}
		}
	}
	markers = {};
	addedMarkers = {};
	addedLayers = {};
	eventMap = null;
}

function initSearchBox(map) {
	var $input = $('#search-input');
	var searchBox = new google.maps.places.Autocomplete($input.get(0));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push($input.get(0));

	searchBox.bindTo('bounds', map);

	searchBox.addListener('place_changed', function() {
		var place = searchBox.getPlace();

		if (place === null) {
			return;
		}

		map.fitBounds(place.geometry.viewport);
	});
}


function hideLayer(name) {
	var layerMarkers = markers[name];

	for (var marker in layerMarkers) {
		if (layerMarkers.hasOwnProperty(marker)) {
			markerCluster.removeMarker(layerMarkers[marker]);
			layerMarkers[marker].setMap(null);
		}
	}
}

function showLayer(name) {
	var layerMarkers = markers[name];

	for (var marker in layerMarkers) {
		if (layerMarkers.hasOwnProperty(marker)) {
			layerMarkers[marker].setMap(eventMap);
			markerCluster.addMarker(layerMarkers[marker]);
		}
	}
}

function addLayer(name) {
	var $layerToogleContainer = $(".layers-for-map-list");
	$layerToogleContainer.append('<li value="' + name + '"><input type="checkbox" class="layer-checkbox" checked="checked" />' + name + '</li>');
}

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

function addMarkersCluster(map, event) {

	if (markerCluster === null) {
		var markerList = [];

		for (var layer in markers) {
			if (markers.hasOwnProperty(layer)) {
				var layerMarkers = markers[layer];
				for (var marker in layerMarkers) {
					if (layerMarkers.hasOwnProperty(marker)) {
						addedMarkers[marker] = true;
						markerList.push(layerMarkers[marker]);
					}
				}
			}
		}

		markerCluster = new MarkerClusterer(map, markerList, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	}

	if (event === undefined) {
		return;
	}

	if (addedMarkers[event._id] === true) {
		return;
	}

	markerCluster.addMarker(markers[event.category.name][event._id]);

}

function addMarker(event, map) {

	if (addedMarkers[event._id]) {
		return;
	}

	var circle = {
		path: 'M 2, 2 m -1, 0 a 1,1 0 1,1 2,0 a 1,1 0 1,1 -2,0',
		strokeColor: event.category.color,
		fillColor: event.category.color,
		fillOpacity: 1,
		scale: 5
	};

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(event.coordinates.lat, event.coordinates.lng),
		map: map,
		icon: circle
	});

	marker.addListener('click', function()
	{

		if ($('#eventPopup').length !== 0) {
			return;
		}

		Session.set('selected', event._id);

		var infoWindow = new google.maps.InfoWindow({
			content: createPopupContent(event)
		});
		infoWindow.open(map, this);

		var hasEditPermissionTo = function (selectedEvent) {
			var loggedInUser = Meteor.user();
			return !!loggedInUser && loggedInUser.profile.name === selectedEvent.organiser.name
		};

		if (!hasEditPermissionTo(event)) {
			slidePanel.closePanel('editEvent');
		}

		GAnalytics.event("Events","open_popup");
		Template.eventPopup.onCreated();

	});

	markers[event.category.name] = markers[event.category.name] || {};
	markers[event.category.name][event._id] = marker;
}

function removeMarker(event) {
	if (markers[event.category.name] !== undefined && markerCluster !== null) {
		var marker = markers[event.category.name][event._id];
		if (marker === null) {
			return;
		}
		marker.setMap(null);
		marker.unbind('click', false);

		markers[event.category.name][event._id] = undefined;
		addedMarkers[event._id] = undefined;
		markerCluster.removeMarker(marker);
	}
}

Template.map.onCreated(function() {
	resetMakerData();
	var instance = this;

	instance.subscribe('events');
	instance.subscribe('categories');

	instance.events = new ReactiveVar([]);
	instance.categories = new ReactiveVar([]);

	GoogleMaps.ready('map', function(map) {

		eventMap = map.instance;

		instance.categories.get().forEach(function(category) {
			if (addedLayers[category.name] !== true) {
				addedLayers[category.name] = true;
				addLayer(category.name);
			}
		});

		$('.layer-checkbox').on('click', function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				showLayer($this.parent().text());
			} else {
				hideLayer($this.parent().text());
			}
		});

		adjustMapHeightToWindowSize($('.map-container'));

		instance.events.get().forEach(function(event) {
			addMarker(event, map.instance);
		});

		var cursor = Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}});
		cursor.observe({
			added: function(event) {
				if (created === true) {
					addMarker(event, map.instance);
					addMarkersCluster(map.instance, event);
				}
			},
			changed: function(newEvent, oldEvent) {
				if (created === true) {
					removeMarker(oldEvent);
					addMarker(newEvent, map.instance);
					addMarkersCluster(map.instance, newEvent);
				}
			},
			removed: function(event) {
				if (created === true) {
					removeMarker(event);
				}
			}
		});
		created = true;
		addMarkersCluster(map.instance);
		initSearchBox(map.instance);
	});
});


Template.map.onRendered(function() {
	GoogleMaps.load({key: "AIzaSyAbKJHLD4QLHnp-nmA37RJpZHQC0qbpba4", libraries: 'places'});

	$(".layers-for-map-btn").on('click', function() {
		$(".layers-for-map").toggle();
	});

	$('#layers-toggle-all').on('click', function() {
		var layers = $('.layers-for-map-list').find('li');
		layers.each(function(layer) {
			var $checkbox = $(layers[layer]).find('.layer-checkbox').first();
			$checkbox.click();
		});
	});
	
	initNewEventButton();
});

Template.map.helpers({
	mapOptions: function() {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(0, 0),
				zoom: 3,
				mapTypeControl: true,
				 mapTypeControlOptions: {
						 style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
						 position: google.maps.ControlPosition.LEFT_TOP
				 },
				 zoomControl: true,
				 zoomControlOptions: {
						 position: google.maps.ControlPosition.LEFT_CENTER
				 },
				 scaleControl: true,
				 streetViewControl: true,
				 streetViewControlOptions: {
						 position: google.maps.ControlPosition.LEFT_TOP
				 },
				 //go to https://snazzymaps.com/ and copy the given code for a template and paste here
				styles: [{"stylers":[{"saturation":100},{"gamma":0.6}]}],
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
});

Template.map.viewmodel({
	panTo: function() {

	}
});

// var markerCluster = null;
// var markers = {};
// var addedMarkers = {};
// var addedLayers = {};
// var eventMap = null;

Template.map.onDestroyed(function() {
	resetMakerData();
	created = false;
});
