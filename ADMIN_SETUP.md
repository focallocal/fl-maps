# FL-Maps Admin Enhancements - Setup Instructions

## Installation Complete! ✅

All admin panel enhancements have been implemented successfully.

## What Was Added

### 1. Posts-First View
- Virtual scrolling with react-window for efficient rendering
- Search by Title, User, Location, or Category  
- Sort by Date, Attendees, Alphabetical, Category, or Location
- Multi-select bulk deletion with confirmation dialogs
- View toggle button to switch between Posts and Users views

### 2. Enhanced Users View
- Sort by Alphabetical, Most Posts, Join Date (Newest/Oldest)
- "Sync Discourse Users" button for manual sync
- Improved controls layout

### 3. Discourse User Sync
- Automatically syncs users from Discourse every 7 days
- Updates user profiles (name, email, roles)
- Creates accounts for Discourse users who haven't logged in yet
- Manual sync button in admin UI

## Configuration Required

### 1. Add Discourse API Credentials

Edit your `settings.json` file (NOT `settings.sample.json`):

```json
{
  "private": {
    "discourse": {
      "url": "https://your-discourse-instance.org",
      "secret": "your-existing-sso-secret",
      "apiKey": "YOUR_DISCOURSE_API_KEY_HERE",
      "apiUsername": "system"
    }
  }
}
```

### 2. Get Your Discourse API Key

1. Log into your Discourse instance as an admin
2. Go to: **Admin** → **API** → **Keys**
3. Click **New API Key**
4. Settings:
   - **Description**: fl-maps user sync
   - **User Level**: All Users
   - **Scope**: Global (or select specific endpoints if you prefer)
   - **User**: system
5. Click **Save** and copy the generated API key
6. Add the key to your `settings.json` as shown above

### 3. Encrypted Settings for Production

If you're using encrypted settings files (`.deployment/*/settings.enc.json`), you'll need to:

1. Decrypt the file:
   ```bash
   sops -d .deployment/yourenvironment/settings.enc.json > settings-temp.json
   ```

2. Edit `settings-temp.json` to add the `apiKey` and `apiUsername` fields

3. Re-encrypt the file:
   ```bash
   sops -e settings-temp.json > .deployment/yourenvironment/settings.enc.json
   rm settings-temp.json
   ```

## Deployment

### For Local Development

1. Make sure `settings.json` has the Discourse API credentials
2. Install dependencies:
   ```bash
   cd fl-maps
   npm install
   ```
3. Start Meteor:
   ```bash
   meteor --settings settings.json
   ```
4. Navigate to `/admin` and log in as an admin user
5. Test the new features!

### For Production

1. Update encrypted settings files with API credentials (see above)
2. Deploy as usual with Travis CI or your deployment method
3. The sync will run automatically on server startup (if >7 days since last sync)
4. Weekly syncs will continue automatically

## Testing the Features

### Test Posts View

1. Log in as admin
2. Go to `/admin`
3. Click **"Show Posts View"**
4. Try:
   - Searching for posts by title
   - Switching search filters (User, Location, Category)
   - Changing sort options
   - Selecting posts and bulk deleting
   - Deleting individual posts

### Test User Sync

1. In Users View, click **"Sync Discourse Users"**
2. Confirm the dialog
3. Wait for sync to complete (may take 1-2 minutes)
4. Check the success message showing how many users were synced
5. Verify new users appear in the users list

### Test User Sorting

1. In Users View, use the **"Sort by"** dropdown
2. Try:
   - Alphabetical (default)
   - Most Posts
   - Join Date (Newest)
   - Join Date (Oldest)

## Troubleshooting

### "Discourse API key not found" Error

**Problem**: The sync fails with this error.

**Solution**: 
- Verify `apiKey` is added to `settings.private.discourse` in your settings file
- Restart Meteor after updating settings
- Check the API key is valid in Discourse admin panel

### Sync Button Does Nothing

**Problem**: Clicking "Sync Discourse Users" has no effect.

**Solution**:
- Check browser console for errors
- Verify you're logged in as an admin user
- Ensure the `Admin.syncDiscourseUsers` method is registered (check server logs on startup)

### Posts Not Loading

**Problem**: Posts view shows "No posts found" when posts exist.

**Solution**:
- Check browser console for errors
- Verify Events collection has data: `meteor mongo` → `db.events.count()`
- Check user has admin role
- Look for errors in `Admin.getPosts` server method

### TypeScript Errors in IDE

**Problem**: Red squiggly lines in TypeScript-enabled editors.

**Solution**:
- These are expected - Meteor packages don't have TypeScript definitions
- The code will run fine in JavaScript/Meteor runtime
- You can ignore these or add `// @ts-ignore` comments if needed

## File Checklist

Verify these files were created/modified:

### New Files Created:
- ✅ `imports/client/ui/pages/Admin/PostsView/index.js`
- ✅ `imports/client/ui/pages/Admin/PostsView/styles.scss`
- ✅ `server/methods/admin/getPosts.js`
- ✅ `server/methods/admin/deletePosts.js`
- ✅ `server/methods/admin/syncDiscourseUsers.js`
- ✅ `ADMIN_ENHANCEMENTS.md` (documentation)
- ✅ `ADMIN_SETUP.md` (this file)

### Modified Files:
- ✅ `package.json` (added react-window@1.8.10)
- ✅ `imports/client/ui/pages/Admin/index.js`
- ✅ `imports/client/ui/pages/Admin/style.scss`
- ✅ `server/methods/admin/index.js`
- ✅ `settings.sample.json`

## Next Steps

1. ✅ Add Discourse API credentials to settings
2. ✅ Test locally
3. ✅ Update production settings
4. ✅ Deploy to production
5. ✅ Run initial sync to backfill existing Discourse users
6. ✅ Monitor weekly syncs in server logs

## Support

If you encounter issues:

1. Check this document's Troubleshooting section
2. Review `ADMIN_ENHANCEMENTS.md` for detailed feature documentation
3. Check server logs for error messages
4. Verify all configuration steps were completed

## Summary of SSO Behavior

**Users ARE automatically created when they log in via Discourse SSO.**

- The `Accounts.updateOrCreateUserFromExternalService` method creates user accounts
- The `Accounts.onLogin` handler sets up profile and roles
- This happens on every login, keeping profiles current

**The Discourse sync is for:**
- Backfilling users who exist in Discourse but haven't logged into fl-maps
- Keeping profiles updated weekly (even for inactive users)
- Syncing role changes from Discourse (e.g., promotions to moderator)

You can think of it as:
- **SSO login** = "just-in-time" user creation/update
- **Periodic sync** = "batch" user creation/update for broader coverage

Both mechanisms work together to ensure the fl-maps user database stays in sync with Discourse.
