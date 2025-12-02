import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import { Events } from '/imports/both/collections/events';

export const getPosts = new ValidatedMethod({
  name: 'Admin.getPosts',
  
  validate({ searchQuery, searchFilter, sortBy }) {
    // Basic validation - could be enhanced with SimpleSchema
    if (searchQuery !== undefined && typeof searchQuery !== 'string') {
      throw new Meteor.Error('invalid-search', 'Search query must be a string');
    }
    if (searchFilter && !['title', 'user', 'location', 'category'].includes(searchFilter)) {
      throw new Meteor.Error('invalid-filter', 'Invalid search filter');
    }
    if (sortBy && !['dateNewest', 'dateOldest', 'mostAttendees', 'alphabetical', 'category', 'location'].includes(sortBy)) {
      throw new Meteor.Error('invalid-sort', 'Invalid sort option');
    }
  },

  run({ searchQuery = '', searchFilter = 'title', sortBy = 'dateNewest' }) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in');
    }

    if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('not-authorized', 'You must be an admin');
    }

    try {
      // Build query based on search filter
      let query = {};
      
      if (searchQuery && searchQuery.trim().length > 0) {
        const searchRegex = { $regex: searchQuery.trim(), $options: 'i' };
        
        switch (searchFilter) {
          case 'title':
            query.name = searchRegex;
            break;
          case 'user':
            query['organiser.name'] = searchRegex;
            break;
          case 'location':
            query.$or = [
              { 'address.name': searchRegex },
              { 'address.city': searchRegex },
              { 'address.country': searchRegex }
            ];
            break;
          case 'category':
            // Query array of objects with name field
            query['categories.name'] = searchRegex;
            break;
        }
      }

      // Build sort options
      let sortOptions = {};
      
      switch (sortBy) {
        case 'dateNewest':
          sortOptions = { createdAt: -1 };
          break;
        case 'dateOldest':
          sortOptions = { createdAt: 1 };
          break;
        case 'mostAttendees':
          sortOptions = { 'engagement.attendees': -1 };
          break;
        case 'alphabetical':
          sortOptions = { name: 1 };
          break;
        case 'category':
          sortOptions = { 'categories.0.name': 1 };
          break;
        case 'location':
          sortOptions = { 'address.city': 1 };
          break;
        default:
          sortOptions = { createdAt: -1 };
      }

      // Get total count
      const totalCount = Events.find(query).count();

      // Fetch posts with selected fields
      const posts = Events.find(query, {
        sort: sortOptions,
        limit: 1000, // Reasonable limit for virtual scrolling
        fields: {
          _id: 1,
          name: 1,
          'organiser._id': 1,
          'organiser.name': 1,
          'organiser.username': 1,
          'address.name': 1,
          'address.city': 1,
          'address.country': 1,
          'address.location': 1,
          categories: 1,
          when: 1,
          createdAt: 1,
          'engagement.attendees': 1
        }
      }).fetch();

      return {
        posts,
        totalCount
      };
    } catch (error) {
      console.error('Error in Admin.getPosts:', error);
      throw new Meteor.Error('internal-error', 'Failed to retrieve posts: ' + error.message);
    }
  }
});
