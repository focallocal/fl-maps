function initializeGeocoding() {
    if (Meteor.settings['private'] == undefined) {
        throw new Meteor.Error('no-settings', "No configuration found. Did you forget to run meteor with --settings option?");
    }
    var apiKey = Meteor.settings['private'].google_api_key;
    return new GeoCoder({
        geocoderProvider: "google",
        httpAdapter: "https",
        apiKey: apiKey
    });
}
geoCoder = initializeGeocoding();
Meteor.methods({
    'getCoords': function(location) {
        //TODO implement debouncing
        //function debounce(wait) {
        //    return function debounce(fn) { return _.debounce(fn, wait); };
        //}
        console.log('getting coords for ' + location);
        var result = geoCoder.geocode(location);
        console.log(result);
        return result;
    }
});