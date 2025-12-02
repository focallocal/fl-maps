import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/**
 * Syncs users from Discourse to the fl-maps database.
 * Since Discourse SSO already handles user authentication and profile data,
 * this method now updates existing users' profiles on demand rather than
 * requiring API access to Discourse.
 * 
 * User data is automatically synced when they log in via Discourse SSO.
 * This method can be used to manually trigger a refresh of user role assignments.
 */

export const syncDiscourseUsers = () => {
  console.log('[Discourse Sync] Starting user role synchronization...');
  
  // Note: Discourse SSO already syncs user profile data on login
  // This function now focuses on ensuring role consistency
  
  let totalUpdated = 0;

  try {
    // Get all users with Discourse service
    const users = Meteor.users.find({
      'services.discourse': { $exists: true }
    }).fetch();

    console.log(`[Discourse Sync] Found ${users.length} Discourse users`);

    users.forEach(user => {
      try {
        const discourseData = user.services && user.services.discourse;
        if (!discourseData) return;

        const {
          admin,
          moderator,
          username
        } = discourseData;

        let rolesUpdated = false;

        // Sync admin role
        if (admin && !Roles.userIsInRole(user._id, 'admin', Roles.GLOBAL_GROUP)) {
          Roles.addUsersToRoles(user._id, 'admin', Roles.GLOBAL_GROUP);
          rolesUpdated = true;
          console.log(`[Discourse Sync] Granted admin role to ${username}`);
        } else if (!admin && Roles.userIsInRole(user._id, 'admin', Roles.GLOBAL_GROUP)) {
          Roles.removeUsersFromRoles(user._id, 'admin', Roles.GLOBAL_GROUP);
          rolesUpdated = true;
          console.log(`[Discourse Sync] Removed admin role from ${username}`);
        }

        // Sync moderator role
        if (moderator && !Roles.userIsInRole(user._id, 'moderator', Roles.GLOBAL_GROUP)) {
          Roles.addUsersToRoles(user._id, 'moderator', Roles.GLOBAL_GROUP);
          rolesUpdated = true;
          console.log(`[Discourse Sync] Granted moderator role to ${username}`);
        } else if (!moderator && Roles.userIsInRole(user._id, 'moderator', Roles.GLOBAL_GROUP)) {
          Roles.removeUsersFromRoles(user._id, 'moderator', Roles.GLOBAL_GROUP);
          rolesUpdated = true;
          console.log(`[Discourse Sync] Removed moderator role from ${username}`);
        }

        if (rolesUpdated) {
          totalUpdated++;
        }
      } catch (error) {
        console.error(`[Discourse Sync] Error syncing user:`, error);
      }
    });

    console.log(`[Discourse Sync] Completed. Updated ${totalUpdated} users.`);

    return {
      success: true,
      totalSynced: users.length,
      totalCreated: 0,
      totalUpdated,
      message: `Synced ${users.length} users. Updated ${totalUpdated} user roles.`
    };
  } catch (error) {
    console.error('[Discourse Sync] Sync failed:', error);
    throw new Meteor.Error('sync-failed', `Failed to sync users: ${error.message}`);
  }
};

// Meteor method for manual invocation
Meteor.methods({
  'Admin.syncDiscourseUsers'() {
    // Check if user is admin
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in');
    }

    const user = Meteor.users.findOne(this.userId);
    const isAdmin = user && Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP);
    
    if (!isAdmin) {
      throw new Meteor.Error('not-authorized', 'You must be an admin to sync users');
    }

    return syncDiscourseUsers();
  }
});
