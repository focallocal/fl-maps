var map, markers = [], resultMarkers = [];
var initializeLeafletMap = function(element, centroid, zoom) {
    map = L.map(element, {
        scrollWheelZoom: true,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: true,
        fullscreenControl: true
    }).setView(new L.LatLng(centroid[0], centroid[1]), zoom);

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



Template.map.rendered = function() {
    var $mapCanvas = $('#map-canvas');
    var $mapContainer = $('#map-container');
    adjustMapHeightToWindowSize($mapCanvas);
    initNewEventButton();

    if (map) {
        $mapContainer.html(map.getContainer());
    } else {
        var centroid = [48.28593, 16.30371];
        initializeLeafletMap($mapCanvas[0], centroid, 2);
        var self = this;
        Tracker.autorun(function () {
            animateMarkers(self);
            var selectedEvent = Events.findOne(Session.get('selected'));
            if (selectedEvent) {
                var marker = markers[selectedEvent._id];
                if (marker) marker.openPopup();
            }
            //var results = Session.get('results');
            //handleSearchResults(results);
        })
    }

    this.data.events.observe({
        added: function(event) {
            var marker = createMarker(event);
            var color = event.category.color;
            addMarker(marker, color);
        },
        changed: function(event) {
            var marker = markers[event._id];
            if (marker) {
                removeMarker(event._id);
                marker = createMarker(event);
                var color = event.category.color;
                addMarker(marker, color);
            }
        },
        removed: function(event) {
            removeMarker(event._id);
        }
    });


};


var addMarker = function(marker, color) {
    map.addLayer(marker);
    markers[marker.options._id] = marker;
    marker.valueOf()._icon.style.backgroundColor = color;
};

var removeMarker = function(_id) {
    var marker = markers[_id];
    if (map.hasLayer(marker)) map.removeLayer(marker);
};

function createPopup(event) {
    return Blaze.toHTMLWithData(Template.eventPopup,event);
}

function createMarker(event) {
    var iconDiameter = 15;
    var marker = new L.Marker(event.coordinates, {
        _id: event._id,
        icon: L.divIcon({
            iconSize: [iconDiameter, iconDiameter],
            className: 'leaflet-div-icon'
        }),
        riseOnHover: true
    });
    marker.bindPopup(createPopup(event))
        .on('click', function(e) {
            Session.set('selected', event._id);
            var hasEditPermissionTo = function (selectedEvent) {
                return Meteor.user().profile.name === selectedEvent.organiser.name
            };
            if (!hasEditPermissionTo(event)) {
                slidePanel.closePanel('eventsForm');
            }
        })
        .on('popupopen', function() {
            Template.eventPopup.onCreated();  //has to be called explicitly
        });
    return marker;
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

function handleSearchResults(results) {
    function clearResults() {
        for (var i = 0, len = resultMarkers.length; i < len; i++) {
            var marker = resultMarkers[i];
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    }

    function addResults() {
        for (var i = 0, len = results.length; i < len; i++) {
            var result = results[i];
            var resultMarker = new L.Marker(result.coordinates, {
                _id: result._id,
                icon: L.divIcon({
                    iconSize: [20, 20],
                    className: 'leaflet-result-marker'
                }),
                zIndexOffset: -2000,
                riseOnHover: true
            });
            resultMarkers[i] = resultMarker;
            map.addLayer(resultMarker);
        }
    }

    function collectBounds() {
        var latlngArr = [];
        var i,len;
        for (i = 0, len = results.length; i < len; i++) {
            latlngArr.push(results[i].coordinates);
        }
        return L.latLngBounds(latlngArr);
    }

    function fitBoundsToResultSet() {
        var bounds = collectBounds();
        map.fitBounds(bounds, {maxZoom: 6});
    }

    if (!!results && results.length != 0) {
        fitBoundsToResultSet();
        clearResults();
        addResults();
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