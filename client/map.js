///////////////////////////////////////////////////////////////////////////////
// Map display

var map, markers = [ ];
var resultMarkers = [];
var initialize = function (element, centroid, zoom, features) {
    map = L.map(element, {
        scrollWheelZoom: true,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false
    }).setView(new L.LatLng(centroid[0], centroid[1]), zoom);

    L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {opacity: 0.5}).addTo(map);

};

var addMarker = function(marker) {
    map.addLayer(marker);
    markers[marker.options._id] = marker;
};

var removeMarker = function(_id) {
    var marker = markers[_id];
    if (map.hasLayer(marker)) map.removeLayer(marker);
};

var createIcon = function(event) {
    var className = 'leaflet-div-icon ';
    var category = '';
    switch (event.category) {
        case "1":
            category = 'pillow';
            break;
        case "2":
            category = 'smile';
            break;
        case "3":
            category = 'bubble';
            break;
        case "4":
            category = 'free-hugs';
            break;
        case "5":
            category = 'musical-connection';
            break;
        case "6":
            category = 'connecting';
            break;
        case "7":
            category = 'inspire-city';
            break;
        case "8":
            category = 'guerrilla-urban';
            break;
        case "9":
            category = 'lets-talk';
            break;
        case "10":
            category = 'slip-n-slide';
            break;
        case "11":
            category = 'togetherness-projects';
            break;
        default:
            category = 'other';
            break;
    }
    return L.divIcon({
        iconSize: [10, 10],
        //html: '<strong>' + category.substring(0,1).toUpperCase() + '</strong>',
        className: className + category
    });
};

var openCreateDialog = function (latlng) {
    if (! Meteor.userId)
        throw new Meteor.Error(403, "You must be logged in");
    Session.set("createCoords", latlng);
    Session.set("createError", null);
    Session.set("showCreateDialog", true);
    $("#newEvent").modal("show");
};

function createPopup(event) {
    return "<b>" + event.title +
        "</b><br>" + event.description +
        "<br>Where: " + event.location +
        "<br>What to bring: " + event.artifact +
        "<br> Organised by: " + event.organiser;
}

Template.map.created = function() {
    Session.set("showCreateDialog", false);
    Events.find({}).observe({
        added: function(event) {
            var marker = new L.Marker(event.latlng, {
                _id: event._id,
                icon: createIcon(event),
                riseOnHover: true
            });
            marker.bindPopup(createPopup(event))
                .on('click', function(e) {
                    Session.set("selected", e.target.options._id);
                });

            addMarker(marker);
        },
        changed: function(event) {
            var marker = markers[event._id];
            if (marker) marker.setIcon(createIcon(event));
        },
        removed: function(event) {
            removeMarker(event._id);
        }
    });

};

Template.map.rendered = function () {
    console.log("rendering map");
    // basic housekeeping
    $(window).resize(function () {
        var h = $(window).height(), offsetTop = 90; // Calculate the top offset
        $('#map_canvas').css('height', (h - offsetTop));
    }).resize();

  // initialize map events
    if (!map) {
        initialize($("#map_canvas")[0], [ 48.28593, 16.30371 ], 4);
        map.on("dblclick", function(e) {
            openCreateDialog(e.latlng);
        });

        var self = this;
        Tracker.autorun(function() {
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
            var results = Session.get("results");

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

            if (!!results && results.length!=0){
                fitBoundsToResultSet();
                clearResults();
                addResults();
            }
        })
    }



};


