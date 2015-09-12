RssFeed.publish('upcomingEvents', function(query) {
    var self = this;
    self.setValue('title', self.cdata('Focallocal events'));
    self.setValue('description', self.cdata('Upcoming focallocal events'));
    self.setValue('link', 'http://focallocal.meteor.com');
    self.setValue('lastBuildDate', new Date());
    self.setValue('pubDate', new Date());
    self.setValue('ttl', 1);
    // managingEditor, webMaster, language, docs, generator

    //TODO create helper to get upcoming events and refactor all occurences in project
    Events.find({dateEvent: {$gte:moment().startOf('day').toDate()}}).forEach(function(doc) {
        var newDescription = '<![CDATA['+doc.description +
                        '<br> Type of event: ' + doc.category.name +
                        '<br> Address: ' + doc.address +
                        '<br> Meeting point: ' + doc.meetingPoint +
                        '<br> Date of event: ' + moment(doc.dateEvent).format("dddd, MMMM Do YYYY")+
                        ' ]]>';
        self.addItem({
            guid: doc._id,
            title: doc.name,
            description: newDescription,
            link: doc.url,
            author: doc.organiser.name,
            pubDate: new Date(),//doc.dateCreated,
            category: doc.category.name
        });
    });

});