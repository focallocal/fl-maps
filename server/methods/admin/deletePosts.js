import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Events } from '/imports/both/collections/events';

export const deletePosts = new ValidatedMethod({
  name: 'Admin.deletePosts',
  
  validate(postIds) {
    if (!Array.isArray(postIds)) {
      throw new Meteor.Error('invalid-input', 'Post IDs must be an array');
    }
    if (postIds.length === 0) {
      throw new Meteor.Error('invalid-input', 'No posts specified for deletion');
    }
    if (postIds.some(id => typeof id !== 'string')) {
      throw new Meteor.Error('invalid-input', 'All post IDs must be strings');
    }
  },

  run(postIds) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in');
    }

    const user = Meteor.users.findOne(this.userId);
    if (!user || user.roles !== 'admin') {
      throw new Meteor.Error('not-authorized', 'You must be an admin');
    }

    // Delete the posts
    const result = Events.remove({
      _id: { $in: postIds }
    });

    return {
      deletedCount: result
    };
  }
});
