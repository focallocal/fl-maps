///////////////////////////////////////////////////////////////////////////////
// Map display

var map, markers = [], resultMarkers = [];
var initialize = function (element, centroid, zoom, features) {
    map = L.map(element, {
        scrollWheelZoom: true,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: true,
        fullscreenControl: true
    }).setView(new L.LatLng(centroid[0], centroid[1]), zoom);

    var Stamen_Watercolor = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 1,
        maxZoom: 16,
        opacity: 0.5
    });
    Stamen_Watercolor.addTo(map);

    map.on("dblclick", function (e) {
        var newEventMsg;
        if (!Meteor.userId()) {
            newEventMsg = $('<span>').text('Please login to add event here!')
        } else {
            newEventMsg = $('<a>')
                .text('Create event here!')
                .attr('href', '#')
                .on('click', function () {
                    openCreateDialog(e.latlng)
                });
        }
        L.popup().setLatLng(e.latlng)
            .setContent(newEventMsg[0])
            .openOn(map);
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

var openCreateDialog = function (latlng) {
    if (! Meteor.userId())
        throw new Meteor.Error(403, "You must be logged in");
    Session.set("createCoords", latlng);
    $("#newEvent").modal("show");
};

function createPopup(event) {
    return '<b> <a href="' + event.hyperlink + '" target="_blank">' + event.title + ' (click here)</a>' +
        "</b><br>" + event.description +
        "</b><br>" + event.category.name +
        "<br>Where: " + event.location + ", " + event.city +
        "<br>Meeting point: " + event.meetingPoint +
        "<br>When: <span title='" + moment(event.dateEvent).format("dddd, MMMM Do YYYY") + "'>" +
        moment(event.dateEvent).fromNow() + "</span>" +
        "<br> Organised by: " + event.organiser;
}

function createMarker(event) {
    return new L.Marker(event.latlng, {
        _id: event._id,
        icon: L.divIcon({
            iconSize: [15, 15],
            className: 'leaflet-div-icon'
        }),
        riseOnHover: true
    })
    .bindPopup(createPopup(event))
    .on('click', function (e) {
        Session.set("selected", event._id);
    });
}

function animateMarkers(self) {
    var selectedEvent = Events.findOne(Session.get("selected"));
    if (selectedEvent) {
        var line;
        if (!self.animatedMarker) {
            line = L.polyline([[selectedEvent.latlng.lat, selectedEvent.latlng.lng]]);
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
        } else {
            // animate to here
            line = L.polyline([[self.animatedMarker.getLatLng().lat, self.animatedMarker.getLatLng().lng],
                [selectedEvent.latlng.lat, selectedEvent.latlng.lng]]);
            self.animatedMarker.setLine(line.getLatLngs());
            self.animatedMarker.start();
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
            var resultMarker = new L.Marker(result.latlng, {
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
        var i;
        for (i = 0, len = results.length; i < len; i++) {
            latlngArr.push(results[i].latlng);
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

Template.map.rendered = function () {
    var $mapCanvas = $('#map_canvas');
    var $window = $(window);
    var $main = $('#main');
    $(window).resize(function () {
        var h = $window.height(),
            w = $window.width(),
            offsetTop = 90,
            offsetWidth = 300;
        $mapCanvas.css('height', (h - offsetTop));
        $main.css('width', (w-offsetWidth));
    }).resize();

  // initialize map events
    if (!map) {
        initialize($mapCanvas[0], [48.28593, 16.30371], 4);
        var self = this;
        Tracker.autorun(function() {
            animateMarkers(self);
            var results = Session.get("results");
            handleSearchResults(results);
        })
    }
    else {
        $('#map_container').html(map.getContainer());
    }

    var futureEvents = Events.find({dateEvent: {$gte:Date.now()}});
    futureEvents.observe({
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


