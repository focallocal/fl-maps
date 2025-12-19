// @ts-nocheck
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { getDiscourseOrigin } from '/imports/client/utils/discourseAvatar';

/**
 * Discourse API methods for the new homepage
 * Fetches active users, news, and gamification leaderboards
 */

// Get Discourse URL from settings or default
const getDiscourseUrl = () => {
  try {
    return getDiscourseOrigin();
  } catch (e) {
    return Meteor.settings?.public?.discourse?.url || 'https://publichappinessmovement.com';
  }
};

// Helper to make Discourse API requests
const discourseRequest = (endpoint, options = {}) => {
  const baseUrl = getDiscourseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = HTTP.get(url, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    });
    return response.data;
  } catch (error) {
    console.error(`[Discourse API] Error fetching ${endpoint}:`, error.message);
    return null;
  }
};

Meteor.methods({
  /**
   * Get active users from Discourse for the past N days
   * Scores users by: topics created + replies + logins (1 point each type)
   * Returns sorted by combined score (most active first)
   */
  'Discourse.getActiveUsers'({ days = 7 } = {}) {
    // Fetch directory of users sorted by different metrics
    const data = discourseRequest('/directory_items.json?period=weekly&order=likes_received');
    
    if (!data || !data.directory_items) {
      return { gatherings: [], projects: [] };
    }

    const baseUrl = getDiscourseUrl();
    
    // Process users with activity scoring
    const users = data.directory_items
      .map(item => {
        const user = item.user;
        // Combined score: topics + posts + likes given/received
        const score = (item.topic_count || 0) + 
                     (item.post_count || 0) + 
                     (item.likes_given || 0) + 
                     (item.likes_received || 0);
        
        // Build avatar URL
        let avatarUrl = '/images/default-avatar.png';
        if (user.avatar_template) {
          avatarUrl = user.avatar_template.replace('{size}', '48');
          if (!avatarUrl.startsWith('http')) {
            avatarUrl = baseUrl + avatarUrl;
          }
        }
        
        return {
          username: user.username,
          avatar: avatarUrl,
          score
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 50); // Limit to top 50

    // For now, return same users for both sections
    // In future, could filter by category participation
    return {
      gatherings: users,
      projects: users
    };
  },

  /**
   * Get latest news topics from Discourse news-hub category
   */
  'Discourse.getLatestNews'({ limit = 3 } = {}) {
    // Fetch topics from news-hub category
    const data = discourseRequest('/c/news-hub.json');
    
    if (!data || !data.topic_list || !data.topic_list.topics) {
      return [];
    }

    const baseUrl = getDiscourseUrl();
    
    return data.topic_list.topics
      .slice(0, limit)
      .map(topic => {
        // Get first image from topic if available
        let image = null;
        if (topic.image_url) {
          image = topic.image_url.startsWith('http') 
            ? topic.image_url 
            : baseUrl + topic.image_url;
        }
        
        return {
          title: topic.title,
          excerpt: topic.excerpt || topic.fancy_title || '',
          url: `${baseUrl}/t/${topic.slug}/${topic.id}`,
          image,
          date: topic.created_at
        };
      });
  },

  /**
   * Get gamification leaderboards from Discourse
   * Includes: hearts received (total/monthly), likes given (monthly),
   * posts created, solutions accepted (total/monthly)
   */
  'Discourse.getLeaderboards'() {
    const baseUrl = getDiscourseUrl();
    const leaderboards = {};

    // Fetch different leaderboard types
    const periods = {
      total: 'all',
      monthly: 'monthly'
    };

    // Hearts received (likes received in Discourse)
    const heartsAllData = discourseRequest('/directory_items.json?period=all&order=likes_received');
    if (heartsAllData?.directory_items) {
      leaderboards.hearts_total = processLeaderboardData(heartsAllData.directory_items, 'likes_received', baseUrl);
    }

    const heartsMonthlyData = discourseRequest('/directory_items.json?period=monthly&order=likes_received');
    if (heartsMonthlyData?.directory_items) {
      leaderboards.hearts_monthly = processLeaderboardData(heartsMonthlyData.directory_items, 'likes_received', baseUrl);
    }

    // Likes given
    const likesGivenData = discourseRequest('/directory_items.json?period=monthly&order=likes_given');
    if (likesGivenData?.directory_items) {
      leaderboards.likes_monthly = processLeaderboardData(likesGivenData.directory_items, 'likes_given', baseUrl);
    }

    // Posts created
    const postsData = discourseRequest('/directory_items.json?period=all&order=post_count');
    if (postsData?.directory_items) {
      leaderboards.posts_created = processLeaderboardData(postsData.directory_items, 'post_count', baseUrl);
    }

    // Solutions accepted - requires solved plugin
    // Try to fetch from gamification/leaderboard endpoint if available
    try {
      const solutionsAllData = discourseRequest('/directory_items.json?period=all&order=solutions');
      if (solutionsAllData?.directory_items) {
        leaderboards.solutions_total = processLeaderboardData(solutionsAllData.directory_items, 'solutions', baseUrl);
      }

      const solutionsMonthlyData = discourseRequest('/directory_items.json?period=monthly&order=solutions');
      if (solutionsMonthlyData?.directory_items) {
        leaderboards.solutions_monthly = processLeaderboardData(solutionsMonthlyData.directory_items, 'solutions', baseUrl);
      }
    } catch (e) {
      console.log('[Discourse API] Solutions leaderboard not available');
    }

    return leaderboards;
  }
});

/**
 * Process raw directory items into leaderboard format
 */
function processLeaderboardData(items, scoreField, baseUrl) {
  return items
    .slice(0, 10)
    .map(item => {
      const user = item.user;
      
      let avatarUrl = '/images/default-avatar.png';
      if (user.avatar_template) {
        avatarUrl = user.avatar_template.replace('{size}', '48');
        if (!avatarUrl.startsWith('http')) {
          avatarUrl = baseUrl + avatarUrl;
        }
      }

      return {
        username: user.username,
        avatar: avatarUrl,
        score: item[scoreField] || 0
      };
    });
}
