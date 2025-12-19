// @ts-nocheck
import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

/**
 * Discourse API methods for the new homepage
 * Fetches active users, news, and gamification leaderboards
 */

// Get Discourse URL from settings or default
const getDiscourseUrl = () => {
  return (
    Meteor.settings?.public?.discourse?.url ||
    'https://publichappinessmovement.com'
  )
}

// Helper to make Discourse API requests
const discourseRequest = (endpoint, options = {}) => {
  const baseUrl = getDiscourseUrl()
  const url = `${baseUrl}${endpoint}`

  try {
    const response = HTTP.get(url, {
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        ...options.headers
      },
      ...options
    })
    return response.data
  } catch (error) {
    console.error(`[Discourse API] Error fetching ${endpoint}:`, error.message)
    return null
  }
}

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
    const baseUrl = getDiscourseUrl();
    
    // First try to get category ID for news-hub
    const categoriesData = discourseRequest('/categories.json');
    let categoryId = null;
    
    if (categoriesData?.category_list?.categories) {
      const newsCategory = categoriesData.category_list.categories.find(
        cat => cat.slug === 'news-hub'
      );
      if (newsCategory) {
        categoryId = newsCategory.id;
      }
    }
    
    // Fetch topics from news-hub category using category ID
    let data;
    if (categoryId) {
      // Use the proper category endpoint with ID
      data = discourseRequest(`/c/news-hub/${categoryId}.json`);
    } else {
      // Fallback to slug-only endpoint
      data = discourseRequest('/c/news-hub.json');
    }
    
    if (!data || !data.topic_list || !data.topic_list.topics) {
      console.log('[Discourse API] No topics found in news-hub category');
      return [];
    }

    // Filter out pinned "About" topics and sort by latest
    const topics = data.topic_list.topics
      .filter(topic => !topic.pinned || !topic.title.toLowerCase().includes('about'))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, limit);
    
    return topics.map(topic => {
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
   * Get upcoming international gatherings from mass-kindness subcategories
   * Each subcategory represents a different global event
   * Fetches the About page from each subcategory for image and description
   */
  'Discourse.getUpcomingGatherings'({ limit = 6 } = {}) {
    const baseUrl = getDiscourseUrl();
    
    // First, get the categories to find mass-kindness subcategories
    const categoriesData = discourseRequest('/categories.json');
    
    if (!categoriesData || !categoriesData.category_list || !categoriesData.category_list.categories) {
      return [];
    }
    
    // Find mass-kindness category and its subcategories
    const massKindnessCategory = categoriesData.category_list.categories.find(
      cat => cat.slug === 'mass-kindness'
    );
    
    if (!massKindnessCategory) {
      return [];
    }
    
    // Get subcategories - these are the individual global events
    const subcategories = massKindnessCategory.subcategory_ids || [];
    const allCategories = categoriesData.category_list.categories;
    
    // Build list of subcategory info
    const eventCategories = subcategories
      .map(subId => allCategories.find(cat => cat.id === subId))
      .filter(cat => cat && !cat.read_restricted)
      .slice(0, limit);
    
    // For each subcategory, try to get the About page (pinned topic)
    const gatherings = eventCategories.map(category => {
      // Fetch topics from this subcategory
      const categoryData = discourseRequest(`/c/${category.slug}.json`);
      
      let aboutTopic = null;
      let image = null;
      let excerpt = category.description_excerpt || category.description_text || '';
      let eventDate = null;
      
      if (categoryData?.topic_list?.topics) {
        // Look for pinned "About" topic
        aboutTopic = categoryData.topic_list.topics.find(
          topic => topic.pinned && topic.title.toLowerCase().includes('about')
        );
        
        // If no About topic, use first pinned topic
        if (!aboutTopic) {
          aboutTopic = categoryData.topic_list.topics.find(topic => topic.pinned);
        }
        
        // If still no topic, use first topic
        if (!aboutTopic && categoryData.topic_list.topics.length > 0) {
          aboutTopic = categoryData.topic_list.topics[0];
        }
        
        if (aboutTopic) {
          // Get image from about topic
          if (aboutTopic.image_url) {
            image = aboutTopic.image_url.startsWith('http')
              ? aboutTopic.image_url
              : baseUrl + aboutTopic.image_url;
          }
          
          // Get excerpt from about topic if available
          if (aboutTopic.excerpt) {
            excerpt = aboutTopic.excerpt;
          }
          
          // Try to extract date from title or excerpt
          // Look for patterns like "First Saturday of July" or dates
          const datePatterns = [
            /(\d{1,2}(?:st|nd|rd|th)?\s+(?:of\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December))/i,
            /((?:First|Second|Third|Fourth|Last)\s+(?:Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)\s+(?:of|in)\s+(?:January|February|March|April|May|June|July|August|September|October|November|December))/i,
            /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}/i
          ];
          
          const textToSearch = (aboutTopic.title + ' ' + excerpt).toLowerCase();
          for (const pattern of datePatterns) {
            const match = textToSearch.match(pattern);
            if (match) {
              eventDate = match[1];
              break;
            }
          }
        }
      }
      
      // Use category uploaded logo/image if no topic image
      if (!image && category.uploaded_logo) {
        image = category.uploaded_logo.url.startsWith('http')
          ? category.uploaded_logo.url
          : baseUrl + category.uploaded_logo.url;
      }
      
      return {
        title: category.name,
        excerpt: excerpt,
        url: `${baseUrl}/c/${category.slug}`,
        image,
        date: eventDate,
        categorySlug: category.slug,
        sortOrder: category.position || 999
      };
    });
    
    // Sort by date (nearest first) - for now just return in category order
    // since parsing dates from text is complex
    return gatherings.sort((a, b) => a.sortOrder - b.sortOrder);
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
