Meteor.methods({
  'Events.insert': function (params) {
    Events.insert(params);
  },
  'Events.report': function(_id, _user_id) {

    if (_id.length === 0) {
      return;
    }

    var event = Events.find({_id: _id}).fetch()[0];
    var number = 1;
    var userList = [];

    if (event.reported !== undefined) {
      number = event.reported.number + 1;
      userList = event.reported.users || [];
    }

    if (userList.indexOf(_user_id) !== -1) {
      return 'You already reported this event!';
    }

    userList.push(_user_id);

    var reported = {
      status: true,
      admin_overwrite: false,
      number: number,
      users: userList
    };

    event['reported'] = reported;

    Events.update({_id: _id}, {'$set': event}, {validate: false});

    return 'Event Reported!';
  }
});
