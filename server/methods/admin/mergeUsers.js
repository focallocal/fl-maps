import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import { Events } from '/imports/both/collections/events';

export const mergeUsers = new ValidatedMethod({
  name: 'Admin.mergeUsers',
  
  validate({ sourceUserId, targetUserId }) {
    if (!sourceUserId || typeof sourceUserId !== 'string') {
      throw new Meteor.Error('invalid-source', 'Source user ID is required');
    }
    if (!targetUserId || typeof targetUserId !== 'string') {
      throw new Meteor.Error('invalid-target', 'Target user ID is required');
    }
    if (sourceUserId === targetUserId) {
      throw new Meteor.Error('same-user', 'Cannot merge user with itself');
    }
  },

  run({ sourceUserId, targetUserId }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in');
    }

    if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('not-authorized', 'You must be an admin');
    }

    try {
      // Get both users to verify they exist
      const sourceUser = Meteor.users.findOne(sourceUserId);
      const targetUser = Meteor.users.findOne(targetUserId);

      if (!sourceUser) {
        throw new Meteor.Error('user-not-found', 'Source user not found');
      }
      if (!targetUser) {
        throw new Meteor.Error('user-not-found', 'Target user not found');
      }

      // Update all events where sourceUser is the organiser
      const eventsUpdated = Events.update(
        { 'organiser._id': sourceUserId },
        { 
          $set: { 
            'organiser._id': targetUserId,
            'organiser.name': targetUser.profile?.name || targetUser.username || 'Unknown',
            'organiser.username': targetUser.username
          } 
        },
        { multi: true }
      );

      // Merge roles (combine unique roles from both users)
      const sourceRoles = Roles.getRolesForUser(sourceUserId, Roles.GLOBAL_GROUP);
      sourceRoles.forEach(role => {
        if (!Roles.userIsInRole(targetUserId, role, Roles.GLOBAL_GROUP)) {
          Roles.addUsersToRoles(targetUserId, role, Roles.GLOBAL_GROUP);
        }
      });

      // Delete the source user
      Meteor.users.remove(sourceUserId);

      console.log(`Merged user ${sourceUserId} into ${targetUserId}. Updated ${eventsUpdated} events.`);

      return {
        success: true,
        eventsUpdated,
        message: `Successfully merged users. ${eventsUpdated} events transferred.`
      };
    } catch (error) {
      console.error('Error in Admin.mergeUsers:', error);
      throw new Meteor.Error('merge-failed', 'Failed to merge users: ' + error.message);
    }
  }
});
