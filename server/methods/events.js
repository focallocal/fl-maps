Meteor.methods({
  'Events.insert': function (params) {
    Events.insert(params);
  },
  'Events.report': function(_id) {

    if (_id.length === 0) {
      return;
    }

    var event = Events.find({_id: _id});
    var number = 0;

    if (event.report !== undefined) {
      number = event.report.number + 1;
    }

    var report = {
      status: true,
      admin_overwrite: false,
      number: number
    };

    Events.update(_id, {'$set': {'report': report}}, { upsert: true, validate: false});
  }
});
