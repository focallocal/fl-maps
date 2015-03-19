
if (Meteor.isClient) {

//resize map on window frame size change
    $(window).resize(function(){
        var h = $(window).height();
        var offsetTop = 90;
        $mc = $('#map_canvas');
        $mc.css('height',(h-offsetTop));
    }).resize();
}

//server and client scope
Meteor.methods({
    createEvent: function (options) {
        if (! (typeof options.title === "string" && options.title.length &&
            typeof options.location === "string" && options.location.length &&
            typeof options.artifact === "string" && options.artifact.length &&
            typeof options.category === "string" && options.category.length &&
            typeof options.description === "string" && options.description.length
            ))
            throw new Meteor.Error(400, "Required parameter missing");
        if (options.title.length > 100)
            throw new Meteor.Error(413, "Event name too long");
        if (options.location.length > 100)
            throw new Meteor.Error(413, "Location too long");
        if (options.artifact.length > 100)
            throw new Meteor.Error(413, "Item name too long");
        if (options.category.length > 100)
            throw new Meteor.Error(413, "Category too long");
        if (options.description.length > 2000)
            throw new Meteor.Error(413, "Description too long");
        //@TODO
        return Events.insert({
            organiser: Meteor.user().profile.name,
            latlng: options.latlng,
            title: options.title,
            location: options.location,
            artifact: options.artifact,
            category: options.category,
            description: options.description,
            datePublished: Date.now(),
            dateEvent: Date.now()
        });
    }
});

