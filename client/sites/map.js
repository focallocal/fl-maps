///////////////////////////////////////////////////////////////////////////////
// Map display

var map, markers = [ ];

var initialize = function (element, centroid, zoom, features) {
    map = L.map(element, {
        scrollWheelZoom: true,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false
    }).setView(new L.LatLng(centroid[0], centroid[1]), zoom);

    L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {opacity: 0.5}).addTo(map);

};


var openCreateDialog = function (latlng) {
    console.log("double click! " + latlng);
    Session.set("createCoords", latlng);
    Session.set("createError", null);
    Session.set("showCreateDialog", true);
    $("#newEvent").modal("show");
};

Template.map.created = function() {
    console.log("Map created!");
    Session.set("showCreateDialog", false);
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
        initialize($("#map_canvas")[0], [ 51.533333, 0.083333 ], 13);
        map.on("dblclick", function(e) {
            openCreateDialog(e.latlng);
    });


//    var self = this;
//    Meteor.autorun(function() {
//      var selectedParty = Parties.findOne(Session.get("selected"));
//      if (selectedParty) {
//        if (!self.animatedMarker) {
//          var line = L.polyline([[selectedParty.latlng.lat, selectedParty.latlng.lng]]);
//          self.animatedMarker = L.animatedMarker(line.getLatLngs(), {
//            autoStart: false,
//            distance: 3000,  // meters
//            interval: 200, // milliseconds
//            icon: L.divIcon({
//              iconSize: [50, 50],
//              className: 'leaflet-animated-icon'
//            })
//          });
//          map.addLayer(self.animatedMarker);
//        } else {
//          // animate to here
//          var line = L.polyline([[self.animatedMarker.getLatLng().lat, self.animatedMarker.getLatLng().lng],
//            [selectedParty.latlng.lat, selectedParty.latlng.lng]]);
//          self.animatedMarker.setLine(line.getLatLngs());
//          self.animatedMarker.start();
//        }
//      }
//    })
    };
//    Template.page.showInviteDialog = function () {
//        return Session.get("showInviteDialog");
//    };


};


