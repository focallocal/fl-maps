var map, markers = [], resultMarkers = [];
var pruneCluster = new PruneClusterForLeaflet();

pruneCluster.PrepareLeafletMarker = function(leafletMarker, data) {
    leafletMarker.setIcon(data.icon, data.category);
    //listeners can be applied to markers in this function
    leafletMarker.on('click', function(){
        Session.set('selected', data.event._id);
        var hasEditPermissionTo = function (selectedEvent) {
            var loggedInUser = Meteor.user();
            return !!loggedInUser && loggedInUser.profile.name === selectedEvent.organiser.name
        };
        if (!hasEditPermissionTo(data.event)) {
            slidePanel.closePanel('eventsForm');
        }
    });
    // A popup can already be attached to the marker
    // bindPopup can override it, but it's faster to update the content instead
    if (leafletMarker.getPopup()) {
        leafletMarker.setPopupContent(data.popup);
    } else {
        leafletMarker.bindPopup(data.popup);
    }
};
var initializeLeafletMap = function(element, centroid, zoom) {
    map = L.map(element, {
        scrollWheelZoom: true,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: true,
        fullscreenControl: true
    }).setView(new L.LatLng(centroid[0], centroid[1]), zoom);
    map.addLayer(pruneCluster);

    map.on('popupopen', function(e) {
        GAnalytics.event("Events","open_popup");
        if (e.popup) {
            Template.eventPopup.onCreated();
        }
    });

    var Stamen_Watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        opacity: 0.7
    });
    Stamen_Watercolor.addTo(map);
};

Template.map.viewmodel({
  // centers map and open popup associated with selected marker
  panTo: function() {
    var eventId = Session.get('selected');
    var event = Events.findOne(eventId);
    if (event) {
        map.panTo([event.coordinates.lat,event.coordinates.lng]);
        setTimeout(function(){
            map.setZoom(10);
        }, 1000);
        $('#map-container').trigger('click'); //set focus
        setTimeout(function(){
            $('#icon-' + eventId).trigger('click'); //TODO uncluster before clicking
        }, 2000);
    }
  }
});

Template.map.rendered = function() {
    var $mapCanvas = $('#map-canvas');
    var $mapContainer = $('#map-container');
    adjustMapHeightToWindowSize($mapCanvas);
    initNewEventButton();

    if (map) {
        $mapContainer.html(map.getContainer());
    } else {
        var centroid = [48.28593, 16.30371];
        initializeLeafletMap($mapCanvas[0], centroid, 3);
        var self = this;
        Tracker.autorun(function () {
            animateMarkers(self);
        });
        this.data.events.observe({
            added: function(event) {
                addMarker(event);
                pruneCluster.ProcessView();
            },
            changed: function(newEvent,oldEvent) {
                removeMarker(oldEvent);
                addMarker(newEvent);
                pruneCluster.ProcessView();
            },
            removed: function(event) {
                removeMarker(event);
                pruneCluster.ProcessView();
            }
        });
    }

};

var addMarker = function(event) {
    var marker = createMarker(event);
    pruneCluster.RegisterMarker(marker);
    markers[event._id] = marker;
};

var removeMarker = function(event) {
    var marker = markers[event._id];
    if (marker) {
        pruneCluster.RemoveMarkers([marker]);
        delete markers[event._id];
    }
};

function createPopupContent(event) {
    return Blaze.toHTMLWithData(Template.eventPopup,event);
}

var prepareMarkerData = function (event) {
    return {
        event: event,
        icon: createIcon(event._id,event.category.color),
        popup: createPopupContent(event),
        category: event.category._id
    };
};

function createMarker(event) {
    var data = prepareMarkerData(event);
    return new PruneCluster.Marker(event.coordinates.lat, event.coordinates.lng, data);
}

function createIcon(id,color) {
    //using custom library to create icon https://github.com/tonekk/Leaflet-Extended-Div-Icon
    var icon = L.extendedDivIcon({
        iconSize: [15, 15],
        className: 'leaflet-div-icon',
        id: 'icon-'+id,
        style: {
            backgroundColor: color
        }
    });
    return icon;
}

function animateMarkers(self) {
    var selectedEvent = Events.findOne(Session.get('selected'));
    if (selectedEvent) {
        var line;
        if (self.animatedMarker) {
            // animate to here
            line = L.polyline([[self.animatedMarker.getLatLng().lat,
                self.animatedMarker.getLatLng().lng],
                [selectedEvent.coordinates.lat, selectedEvent.coordinates.lng]]);
            self.animatedMarker.setLine(line.getLatLngs());
            self.animatedMarker.start();
        } else {
            line = L.polyline([[selectedEvent.coordinates.lat,
                selectedEvent.coordinates.lng]]);
            self.animatedMarker = L.animatedMarker(line.getLatLngs(), {
                autoStart: false,
                distance: 10000,  // meters
                interval: 5, // milliseconds
                icon: L.divIcon({
                    iconSize: [20, 20],
                    className: 'leaflet-animated-icon'
                })
            });
            map.addLayer(self.animatedMarker);
        }
    }
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
            Materialize.toast('Oops! Please login to add event!', toastTimeout);
        } else {
            Session.set('isEdit',false);
            slidePanel.showPanel('eventsForm');
        }
    }).trigger('mouseenter');
    $('body').click(function() {
        $newEventBtn.trigger('mouseleave');
    })
}
