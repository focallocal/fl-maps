import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { getDiscourseOrigin } from '/imports/both/utils/discourse';

/**
 * Syncs users from Discourse to the fl-maps database.
 * This method fetches users from the Discourse API and creates/updates their
 * accounts in Meteor with proper profile information and roles.
 * 
 * Schedule this to run weekly to keep user profiles up-to-date.
 */

export const syncDiscourseUsers = () => {
  console.log('[Discourse Sync] Starting user synchronization...');
  
  const origin = getDiscourseOrigin();
  const apiKey = Meteor.settings.private?.discourse?.apiKey;
  const apiUsername = Meteor.settings.private?.discourse?.apiUsername || 'system';
  
  if (!apiKey) {
    throw new Meteor.Error(
      'discourse-api-key-missing',
      'Discourse API key not found in settings.private.discourse.apiKey'
    );
  }

  let page = 0;
  let totalSynced = 0;
  let totalUpdated = 0;
  let totalCreated = 0;
  let hasMore = true;

  while (hasMore) {
    try {
      console.log(`[Discourse Sync] Fetching page ${page}...`);
      
      // Fetch users from Discourse admin API
      // See: https://docs.discourse.org/#tag/Users/operation/adminListUsers
      const response = HTTP.get(`${origin}/admin/users/list/active.json`, {
        params: {
          page,
          show_emails: true
        },
        headers: {
          'Api-Key': apiKey,
          'Api-Username': apiUsername
        },
        timeout: 30000
      });

      const users = response.data || [];
      
      if (!Array.isArray(users) || users.length === 0) {
        hasMore = false;
        break;
      }

      console.log(`[Discourse Sync] Processing ${users.length} users from page ${page}`);

      users.forEach(discourseUser => {
        try {
          const {
            id,
            username,
            name,
            email,
            admin,
            moderator,
            groups
          } = discourseUser;

          // Check if user already exists
          const existingUser = Meteor.users.findOne({
            'services.discourse.id': id
          });

          if (existingUser) {
            // Update existing user
            const profileName = name || username;
            
            Meteor.users.update(existingUser._id, {
              $set: {
                'profile.name': profileName,
                'services.discourse': {
                  id,
                  username,
                  name,
                  groups: Array.isArray(groups) ? groups.map(g => g.name).join(',') : '',
                  email,
                  admin: !!admin,
                  moderator: !!moderator
                }
              }
            });

            // Update roles
            Roles.setUserRoles(existingUser._id, [], Roles.GLOBAL_GROUP);
            if (admin) {
              Roles.addUsersToRoles(existingUser._id, 'admin', Roles.GLOBAL_GROUP);
            } else if (moderator) {
              Roles.addUsersToRoles(existingUser._id, 'moderator', Roles.GLOBAL_GROUP);
            } else {
              Roles.addUsersToRoles(existingUser._id, 'user', Roles.GLOBAL_GROUP);
            }

            totalUpdated++;
          } else {
            // Create new user using the same method as SSO login
            const result = Accounts.updateOrCreateUserFromExternalService('discourse', {
              id,
              username,
              name,
              groups: Array.isArray(groups) ? groups.map(g => g.name).join(',') : '',
              email,
              admin: !!admin,
              moderator: !!moderator
            });

            if (result && result.userId) {
              // Set profile and roles (same as onLogin handler)
              const profileName = name || username;
              Meteor.users.update(result.userId, {
                $set: { 'profile.name': profileName }
              });

              Roles.setUserRoles(result.userId, [], Roles.GLOBAL_GROUP);
              if (admin) {
                Roles.addUsersToRoles(result.userId, 'admin', Roles.GLOBAL_GROUP);
              } else if (moderator) {
                Roles.addUsersToRoles(result.userId, 'moderator', Roles.GLOBAL_GROUP);
              } else {
                Roles.addUsersToRoles(result.userId, 'user', Roles.GLOBAL_GROUP);
              }

              totalCreated++;
            }
          }

          totalSynced++;
        } catch (userError) {
          console.error(`[Discourse Sync] Error processing user ${discourseUser.username}:`, userError);
        }
      });

      page++;
      
      // Discourse typically returns 100 users per page
      // If we got fewer, we've reached the end
      if (users.length < 100) {
        hasMore = false;
      }

    } catch (pageError) {
      console.error(`[Discourse Sync] Error fetching page ${page}:`, pageError);
      hasMore = false;
    }
  }

  const summary = {
    totalSynced,
    totalCreated,
    totalUpdated,
    completedAt: new Date()
  };

  console.log('[Discourse Sync] Synchronization complete:', summary);
  return summary;
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

// Schedule weekly sync
if (Meteor.isServer) {
  const SyncedAt = new Mongo.Collection('discourse_user_sync_log');
  
  // Run sync on server startup if it hasn't run in the last 7 days
  Meteor.startup(() => {
    const lastSync = SyncedAt.findOne({}, { sort: { syncedAt: -1 } });
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    if (!lastSync || lastSync.syncedAt < sevenDaysAgo) {
      console.log('[Discourse Sync] Running scheduled sync...');
      try {
        const result = syncDiscourseUsers();
        SyncedAt.insert({ syncedAt: new Date(), result });
      } catch (error) {
        console.error('[Discourse Sync] Scheduled sync failed:', error);
      }
    } else {
      console.log('[Discourse Sync] Skipping sync - last run was recent');
    }
  });

  // Run sync weekly (every 7 days)
  const weekInMs = 7 * 24 * 60 * 60 * 1000;
  Meteor.setInterval(() => {
    console.log('[Discourse Sync] Running weekly sync...');
    try {
      const result = syncDiscourseUsers();
      SyncedAt.insert({ syncedAt: new Date(), result });
    } catch (error) {
      console.error('[Discourse Sync] Weekly sync failed:', error);
    }
  }, weekInMs);
}
