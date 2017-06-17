Meteor.methods({
  'Events.insert': function (params) {
    check(doc, Schema.contact);
    Events.insert(params);
  },
  'Events.report': function(_id, _user_id) {

    if (_user_id === null) {
      return 'You must be logged in!';
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
  },
  'Events.engage': function(_id, _user_id, add) {

    // Adds or removes the user to the list of attendees

    if (_user_id === null) {

      return "You must be logged in!";

    }

    var event = Events.find({_id: _id}).fetch()[0];

    event.engagement = event.engagement || {};
    event.engagement.attendees = event.engagement.attendees || [];
    event.engagement.limit = event.engagement.limit || 0;

    if (add === true) {

      if ((event.engagement.attendees.length >= event.engagement.limit) && event.engagement.limit !== 0) {

        return "Sorry! This event is full";

      }

      if (event.engagement.attendees.indexOf(_user_id) !== -1) {

        return "You are alredy ateending!";

      } else {

        event.engagement.attendees.push(_user_id);
        Events.update({_id: _id}, {'$set': event}, {validate: false});

        return "You will be attending!";
      }

    } else {

      var user = event.engagement.attendees.indexOf(_user_id);

      if (user === -1) {

        return "You were not attending";

      } else {

        event.engagement.attendees.splice(user, 1);
        Events.update({_id: _id}, {'$set': event}, {validate: false});

        return "You are no longer attending!";

      }

    }
  },
  'Events.getEngagement': function(_id, _user_id) {
    var event = Events.find({_id: _id}).fetch()[0];
    event.engagement = event.engagement || {limit: 0, attendees: []};
    var attendeesNum = (event.engagement.attendees || []).length;
    var limit = event.engagement.limit;

    if (_user_id === null) {
      return {
        maxCapacity: (limit <= attendeesNum) && limit !== 0,
        attendeesNum: attendeesNum
      }
    } else {
      return {
        maxCapacity: (limit <= attendeesNum) && limit !== 0,
        attendeesNum: attendeesNum,
        userAttending: event.engagement.attendees.indexOf(_user_id) !== -1
      }
    }
  }
});
