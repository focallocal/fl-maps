//client scope
if (Meteor.isClient) {
//resize map on window frame size change
    $(window).resize(function(){
        var h = $(window).height();
        var offsetTop = 90;
        $mc = $('#map_canvas');
        $mc.css('height',(h-offsetTop));
    }).resize();
    Meteor.subscribe("events");
    Meteor.subscribe("categories");
}
//server scope
if (Meteor.isServer) {
    Meteor.publish("events",function() {
        return Events.find({});
    });
    Meteor.publish("categories",function() {
        return Categories.find({});
    })
}
//server and client scope
Meteor.methods({
    createEvent: function (options) {
        if (! (typeof options.title === "string" && options.title.length &&
            typeof options.location === "string" && options.location.length &&
            typeof options.hyperlink === "string" &&
            typeof options.category === "string" && options.category.length &&
            typeof options.description === "string" && options.description.length
            ))
            throw new Meteor.Error(400, "Required parameter missing");
        if (options.title.length > 100)
            throw new Meteor.Error(413, "Event name too long");
        if (options.location.length > 100)
            throw new Meteor.Error(413, "Location too long");
        if (options.hyperlink.length > 100)
            throw new Meteor.Error(413, "Link too long");
        if (options.category.length > 100)
            throw new Meteor.Error(413, "Category too long");
        if (options.description.length > 2000)
            throw new Meteor.Error(413, "Description too long");
        return Events.insert({
            organiser: Meteor.user().profile.name,
            latlng: options.latlng,
            title: options.title,
            location: options.location,
            hyperlink: options.hyperlink,
            category: Categories.findOne({_id: options.category}),
            description: options.description,
            datePublished: Date.now(),
            dateEvent: Date.now()
        });
    }
});

