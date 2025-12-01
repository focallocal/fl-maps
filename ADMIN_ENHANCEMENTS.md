# FL-Maps Admin Enhancements

## Overview
Major enhancements to the fl-maps admin panel for improved moderation capabilities at scale.

## Features Implemented

### 1. Posts-First View with Virtual Scrolling
- **Component**: `imports/client/ui/pages/Admin/PostsView/index.js`
- **Technology**: react-window v1.8.10 (lightweight virtual scrolling library, 7KB)
- **Features**:
  - Displays all posts in a scrollable list with efficient rendering
  - Shows: Title, Organizer, Location, Categories, Date
  - Inline delete action for individual posts
  - Multi-select with bulk deletion
  - Handles thousands of posts without performance degradation

### 2. Advanced Search and Filtering
- **Search Filters**:
  - **Title**: Search posts by title
  - **User**: Search by organizer name
  - **Location**: Search by city, country, or location name
  - **Category**: Search by category name
- Real-time search with automatic query on text change
- Filter buttons to switch search context

### 3. Sort Functionality

#### Posts View Sorting:
- **Date (Newest)** - Default sort
- **Date (Oldest)**
- **Most Attendees**
- **Alphabetical** (by title)
- **By Category**
- **By Location**

#### Users View Sorting:
- **Alphabetical** - Default sort
- **Most Posts** (counts posts per user)
- **Join Date (Newest)**
- **Join Date (Oldest)**

### 4. Bulk Operations
- Multi-select checkboxes on posts
- "Select All" checkbox in header
- "Delete Selected (X)" button appears when posts are selected
- Confirmation dialog: "Are you sure you want to delete X posts?"
- Server method: `Admin.deletePosts` handles bulk deletion safely

### 5. View Toggle
- Button to switch between "Posts View" and "Users View"
- Button text changes dynamically: "Show Posts View" / "Show Users View"
- Posts-specific controls only appear in Posts view
- Users-specific controls only appear in Users view

### 6. UI Text Updates
- Changed "Toggle Events Display" → "Toggle Posts Display"
- All user-facing text updated from "events" to "posts"
- Backend method names preserved for consistency (e.g., `getEvents`, `deleteAllEvents`)

### 7. Discourse User Sync
- **File**: `server/methods/admin/syncDiscourseUsers.js`
- **Features**:
  - Fetches all users from Discourse API
  - Creates new user accounts in fl-maps
  - Updates existing user profiles (name, username, email, roles)
  - Syncs admin/moderator roles from Discourse
  - Scheduled to run weekly automatically
  - Manual trigger via "Sync Discourse Users" button in admin UI
  - Logs sync results (total synced, created, updated)

## Server Methods Added

### `Admin.getPosts`
- **Purpose**: Fetch posts with search, filter, and sort options
- **Parameters**:
  - `searchQuery`: String to search for
  - `searchFilter`: 'title' | 'user' | 'location' | 'category'
  - `sortBy`: 'dateNewest' | 'dateOldest' | 'mostAttendees' | 'alphabetical' | 'category' | 'location'
- **Returns**: `{ posts: [], totalCount: Number }`
- **Performance**: Returns up to 1000 posts with selected fields only

### `Admin.deletePosts`
- **Purpose**: Bulk delete posts by ID
- **Parameters**: Array of post IDs (strings)
- **Security**: Admin-only access
- **Returns**: `{ deletedCount: Number }`

### `Admin.syncDiscourseUsers`
- **Purpose**: Sync users from Discourse to fl-maps
- **Security**: Admin-only access
- **Returns**: `{ totalSynced, totalCreated, totalUpdated, completedAt }`
- **Schedule**: Runs automatically every 7 days

## Configuration

### Discourse API Setup
Add to your `settings.json`:

```json
{
  "private": {
    "discourse": {
      "url": "https://your-discourse-instance.org",
      "secret": "your-sso-secret",
      "apiKey": "your-discourse-api-key",
      "apiUsername": "system"
    }
  }
}
```

**To get a Discourse API key:**
1. Go to your Discourse admin panel
2. Navigate to API → Keys
3. Create a new API key with "All Users" scope
4. Set the key to be used by user "system" (or another admin user)
5. Copy the key to your settings

## User Sync Behavior

### Automatic SSO User Creation
Users **are automatically created** when they log in via Discourse SSO. The `Accounts.updateOrCreateUserFromExternalService` method creates the user account, and the `Accounts.onLogin` handler:
- Sets `profile.name` from Discourse name/username
- Syncs roles (admin, moderator, user) from Discourse status
- This happens on every login, keeping profiles up-to-date

### Periodic Sync
The `syncDiscourseUsers` function:
- Runs automatically on server startup (if last run was >7 days ago)
- Runs every 7 days automatically
- Can be triggered manually by admins via the "Sync Discourse Users" button
- Fetches ALL users from Discourse (paginated API calls)
- Creates accounts for users who haven't logged in yet
- Updates profiles for existing users (name, email, roles)

**Why sync periodically?**
- Ensures profile information stays current even if users don't log in frequently
- Catches role changes (e.g., user promoted to moderator in Discourse)
- Backfills users who exist in Discourse but haven't logged into fl-maps yet

## Files Modified/Created

### New Files:
- `imports/client/ui/pages/Admin/PostsView/index.js` - Main posts view component
- `imports/client/ui/pages/Admin/PostsView/styles.scss` - Styling for posts view
- `server/methods/admin/getPosts.js` - Server method for fetching posts
- `server/methods/admin/deletePosts.js` - Server method for bulk deletion
- `server/methods/admin/syncDiscourseUsers.js` - Discourse user sync logic

### Modified Files:
- `package.json` - Added react-window@1.8.10 dependency
- `imports/client/ui/pages/Admin/index.js` - View toggle, sort logic, sync button
- `imports/client/ui/pages/Admin/style.scss` - Styling for sort dropdown
- `server/methods/admin/index.js` - Registered new server methods
- `settings.sample.json` - Added Discourse API configuration

## Usage

### For End Users:

1. **Switch to Posts View**: Click "Show Posts View" button
2. **Search Posts**: 
   - Type in search box
   - Click filter button (Title/User/Location/Category)
3. **Sort Posts**: Select option from "Sort by" dropdown
4. **Delete Single Post**: Click "Delete" button next to post
5. **Bulk Delete**:
   - Check boxes next to posts you want to delete
   - Click "Delete Selected (X)" button
   - Confirm deletion in dialog
6. **Sync Discourse Users** (Admin only):
   - Click "Sync Discourse Users" button in Users view
   - Wait for sync to complete (may take a few minutes)
   - View sync results in alert dialog

### For Developers:

Run sync manually in Meteor shell:
```javascript
Meteor.call('Admin.syncDiscourseUsers', (err, result) => {
  console.log(result);
});
```

## Performance Considerations

- **Virtual Scrolling**: Only renders visible posts (~10-15 at a time)
- **Field Selection**: Server only returns necessary fields, reducing bandwidth
- **1000 Post Limit**: Posts view caps at 1000 results (use search to narrow down)
- **Debounced Search**: Consider adding debounce if search performance is an issue
- **Sync Duration**: Discourse sync may take 1-2 minutes for large user bases (1000+ users)

## Future Enhancements

Potential improvements:
- Pagination controls (in addition to virtual scrolling)
- Export posts to CSV
- Advanced filters (date range, category multi-select)
- Post preview/edit in admin
- User import from CSV
- Sync status indicator (last sync time, next scheduled sync)

## Troubleshooting

### Posts not loading
- Check browser console for errors
- Verify `Admin.getPosts` method is registered
- Check user has admin permissions

### Sync fails
- Verify Discourse API key is valid
- Check `apiUsername` has admin permissions in Discourse
- Check Discourse API endpoint is accessible from server
- Review server logs for detailed error messages

### Virtual scrolling issues
- Ensure react-window@1.8.10 is installed (compatible with React 16)
- Clear browser cache
- Check for console errors related to react-window

## Testing

Manual testing checklist:
- [ ] Posts view displays correctly
- [ ] Search works for all filter types
- [ ] All sort options work correctly
- [ ] Individual post deletion works
- [ ] Bulk deletion works with confirmation
- [ ] View toggle preserves state
- [ ] User sort options work
- [ ] Discourse sync creates new users
- [ ] Discourse sync updates existing users
- [ ] Sync button shows "Syncing..." state
- [ ] Success/error messages display correctly
