var markerCluster = null;
var markers = {};
var addedMarkers = {};
var addedLayers = {};
eventMap = null;
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
					markers[layer][marker].unbind('click');
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

function addLayer(category) {
	var $layerToogleContainer = $(".layers-for-map-list");
	$layerToogleContainer.append('<li value="' + category.name + '"> <div class="layer-color" style="background-color:' + category.color + ';"></div><input type="checkbox" class="layer-checkbox" checked="checked" />' + category.name + '</li>');
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

		var latLng = new google.maps.LatLng(event.coordinates.lat, event.coordinates.lng);
		eventMap.panTo(latLng);
		if(eventMap.getZoom() < 7){
			eventMap.setZoom(7);
		}

		$("#report-btn").on('click', function() {
			$('#confirm-report-map').openModal({
		      dismissible: false
		  });
		});
	});

	marker.addListener('dblclick', function() {
		var latLng = new google.maps.LatLng(event.coordinates.lat, event.coordinates.lng);
		eventMap.panTo(latLng);

		//right now it smoths until zoom 15
		//if you want more zoom just increase the value
		smoothZoom(eventMap, 15, eventMap.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level
	});

	markers[event.category.name] = markers[event.category.name] || {};
	markers[event.category.name][event._id] = marker;
}//end add marker with event listeners

//////////////smoth zoom function begin///////////////////////////////////
// the smooth zoom function
function smoothZoom (map, max, cnt) {
	if (cnt >= max) {
		return;
	} else {
		z = google.maps.event.addListener(map, 'zoom_changed', function(event){
			  google.maps.event.removeListener(z);
				smoothZoom(map, max, cnt + 1);
			});
			setTimeout(function(){map.setZoom(cnt)}, 100); // 80ms is what I found to work well on my system -- it might not work well on all systems
		}
}


///////////////////////////////smoth zoom end/////////////////////////

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

		adjustMapHeightToWindowSize($('.map-container'));

		instance.categories.get().forEach(function(category) {
			if (addedLayers[category.name] === undefined) {
				addedLayers[category.name] = true;
				addLayer(category);
			}
		});

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

		$('.layer-checkbox').on('click', function() {
			var $this = $(this);
			if ($this.is(':checked')) {
				showLayer($this.parent().text().trim());
			} else {
				hideLayer($this.parent().text().trim());
			}
		});

		created = true;
		addMarkersCluster(map.instance);
		initSearchBox(map.instance);

	});
});


Template.map.onRendered(function() {
	GoogleMaps.load({key: Meteor.settings["public"]["gm"]["key"], libraries: 'places'});

	$(".layers-for-map-btn").on('click', function() {
		$(".layers-for-map").toggle();
	});

	$(".layers-for-map").show();

	setTimeout(function() {$(".layers-for-map").hide()}, 1000);

	$('#layers-toggle-all').on('click', function() {
		var layers = $('.layers-for-map-list').find('li');
		layers.each(function(layer) {
			var $checkbox = $(layers[layer]).find('.layer-checkbox').first();
			$checkbox.click();
		});
	});

	$("#print-btn").on('click', function() {
		$("#unfinished-feature-modal").openModal({
			dismissible: true
		});
	});

	if (Meteor.user() === null && $("#welcomeModal").length !== 0) {
		$("#welcomeModal").openModal({
			dismissible: true
		});
	}

	$("#join-us-btn").on('click', function() {
		$("#join-us-modal").openModal({
			dismissible: true
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
						 position: google.maps.ControlPosition.LEFT_BOTTOM
				 },
				 scaleControl: true,
				 streetViewControl: true,
				 streetViewControlOptions: {
						 position: google.maps.ControlPosition.LEFT_BOTTOM
				 },
				 //go to https://snazzymaps.com/ and copy the given code for a template and paste here
				styles: [
			    {
			      "featureType":"all",
			      "elementType":"all",
			      "stylers":[
			        {
			          "saturation":"100"
			        },
			        {
			          "gamma":"0.50"
			        },
			        {
			          "weight":"1.00"
			        }
			      ]
			    },
			    {
			      "featureType":"all",
			      "elementType":"labels.icon",
			      "stylers":[
			        {
			          "weight":"4.00"
			        }
			      ]
			    },
			    {
			      "featureType":"administrative.country",
			      "elementType":"all",
			      "stylers":[
			        {
			          "weight":"0.4"
			        },
			        {
			          "hue":"#b9ff00"
			        }
			      ]
			    },
			    {
			      "featureType":"administrative.country",
			      "elementType":"labels",
			      "stylers":[
			        {
			          "weight":"4.00"
			        }
			      ]
			    },
			    {
			      "featureType":"administrative.province",
			      "elementType":"all",
			      "stylers":[
			        {
			          "hue":"#b9ff00"
			        },
			        {
			          "lightness":"0"
			        }
			      ]
			    },
			    {
			      "featureType":"administrative.locality",
			      "elementType":"all",
			      "stylers":[
			        {
			          "weight":"3"
			        },
			        {
			          "lightness":"0"
			        }
			      ]
			    },
			    {
			      "featureType":"administrative.locality",
			      "elementType":"labels.text",
			      "stylers":[
			        {
			          "weight":"1.00"
			        }
			      ]
			    },
			    {
			      "featureType":"administrative.neighborhood",
			      "elementType":"all",
			      "stylers":[
			        {
			          "gamma":"1.97"
			        },
			        {
			          "lightness":"0"
			        },
			        {
			          "weight":"6.26"
			        }
			      ]
			    },
			    {
			      "featureType":"landscape.man_made",
			      "elementType":"geometry",
			      "stylers":[
			        {
			          "lightness":"67"
			        },
			        {
			          "gamma":"1.00"
			        },
			        {
			          "saturation":"100"
			        },
			        {
			          "weight":"2.17"
			        },
			        {
			          "hue":"#0053ff"
			        }
			      ]
			    },
			    {
			      "featureType":"landscape.natural",
			      "elementType":"geometry",
			      "stylers":[
			        {
			          "lightness":"0"
			        }
			      ]
			    },
			    {
			      "featureType":"poi.park",
			      "elementType":"all",
			      "stylers":[
			        {
			          "weight":"1.00"
			        },
			        {
			          "lightness":"-5"
			        },
			        {
			          "hue":"#8bff00"
			        },
			        {
			          "gamma":"1.20"
			        },
			        {
			          "saturation":"12"
			        }
			      ]
			    },
			    {
			      "featureType":"road.highway",
			      "elementType":"geometry",
			      "stylers":[
			        {
			          "weight":"0.50"
			        }
			      ]
			    },
			    {
			      "featureType":"road.highway",
			      "elementType":"labels",
			      "stylers":[
			        {
			          "saturation":"33"
			        },
			        {
			          "lightness":"35"
			        },
			        {
			          "weight":"1.00"
			        },
			        {
			          "gamma":"1"
			        },
			        {
			          "visibility":"off"
			        },
			        {
			          "hue":"#fffa00"
			        }
			      ]
			    },
			    {
			      "featureType":"road.arterial",
			      "elementType":"labels.text",
			      "stylers":[
			        {
			          "saturation":"-91"
			        },
			        {
			          "lightness":"0"
			        }
			      ]
			    },
			    {
			      "featureType":"road.local",
			      "elementType":"all",
			      "stylers":[
			        {
			          "visibility":"simplified"
			        },
			        {
			          "hue":"#ff0000"
			        },
			        {
			          "gamma":"7.50"
			        }
			      ]
			    },
			    {
			      "featureType":"road.local",
			      "elementType":"labels.text",
			      "stylers":[
			        {
			          "hue":"#ff0000"
			        },
			        {
			          "saturation":"0"
			        },
			        {
			          "lightness":"0"
			        }
			      ]
			    },
			    {
			      "featureType":"transit",
			      "elementType":"all",
			      "stylers":[
			        {
			          "weight":"0.30"
			        },
			        {
			          "lightness":"0"
			        }
			      ]
			    }
			  ],
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
		var event = Session.get('selectedEvent');
		var latLng = new google.maps.LatLng(event.coordinates.lat, event.coordinates.lng);
		eventMap.panTo(latLng);
		eventMap.setZoom(10);
	}
});

Template.map.onDestroyed(function() {
	resetMakerData();
	created = false;
	slidePanel.closePanel('editEvent');
});
