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

// Helper to get month order for sorting
const getMonthOrder = (dateStr) => {
  if (!dateStr) return 99; // TBA goes to end
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                  'july', 'august', 'september', 'october', 'november', 'december'];
  const lowerDate = dateStr.toLowerCase();
  for (let i = 0; i < months.length; i++) {
    if (lowerDate.includes(months[i])) {
      return i;
    }
  }
  return 99; // Unknown date goes to end
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
    
    // Fetch actual content for each topic
    return topics.map(topic => {
      let image = null;
      let excerpt = '';
      
      // Fetch the actual topic content
      const topicData = discourseRequest(`/t/${topic.id}.json`);
      
      if (topicData) {
        // Get image from topic
        if (topicData.image_url) {
          image = topicData.image_url.startsWith('http')
            ? topicData.image_url
            : baseUrl + topicData.image_url;
        }
        
        // Get first post content for excerpt
        if (topicData.post_stream?.posts?.length > 0) {
          const firstPost = topicData.post_stream.posts[0];
          const postContent = firstPost.cooked || '';
          
          // Strip HTML and get first 200 chars
          const textContent = postContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          excerpt = textContent.substring(0, 200);
        }
      }
      
      // Fallback to topic-level data
      if (!image && topic.image_url) {
        image = topic.image_url.startsWith('http') 
          ? topic.image_url 
          : baseUrl + topic.image_url;
      }
      
      if (!excerpt) {
        excerpt = topic.excerpt || topic.fancy_title || '';
      }
      
      return {
        title: topic.title,
        excerpt,
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
      // Fetch topics from this subcategory using category ID
      const categoryData = discourseRequest(`/c/${category.slug}/${category.id}.json`);
      
      let aboutTopic = null;
      let image = null;
      let excerpt = category.description_excerpt || category.description_text || '';
      let eventDate = null;
      let eventDateRaw = null; // For sorting
      
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
          // Fetch the actual topic content to get the full text for date parsing
          const topicData = discourseRequest(`/t/${aboutTopic.id}.json`);
          
          if (topicData) {
            // Get image from topic
            if (topicData.image_url) {
              image = topicData.image_url.startsWith('http')
                ? topicData.image_url
                : baseUrl + topicData.image_url;
            }
            
            // Get first post content for date extraction
            if (topicData.post_stream?.posts?.length > 0) {
              const firstPost = topicData.post_stream.posts[0];
              const postContent = firstPost.cooked || ''; // HTML content
              
              // Also use excerpt if available
              if (firstPost.excerpt) {
                excerpt = firstPost.excerpt;
              }
              
              // Extract date from the first line of the post
              // Looking for dates at the top like "First Saturday of July" or "March 15th"
              const datePatterns = [
                /((?:First|Second|Third|Fourth|Last)\s+(?:Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)\s+(?:of|in)\s+(?:January|February|March|April|May|June|July|August|September|October|November|December))/i,
                /(\d{1,2}(?:st|nd|rd|th)?\s+(?:of\s+)?(?:January|February|March|April|May|June|July|August|September|October|November|December))/i,
                /((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?)/i
              ];
              
              // Parse HTML to get text
              const textContent = postContent.replace(/<[^>]*>/g, ' ').replace(/\\s+/g, ' ').trim();
              const firstLines = textContent.substring(0, 500); // Check first 500 chars
              
              for (const pattern of datePatterns) {
                const match = firstLines.match(pattern);
                if (match) {
                  eventDate = match[1];
                  // Try to calculate approximate sort date
                  eventDateRaw = getMonthOrder(eventDate);
                  break;
                }
              }
            }
          }
          
          // Fallback to topic-level data if we didn't get content
          if (!image && aboutTopic.image_url) {
            image = aboutTopic.image_url.startsWith('http')
              ? aboutTopic.image_url
              : baseUrl + aboutTopic.image_url;
          }
          
          if (!excerpt && aboutTopic.excerpt) {
            excerpt = aboutTopic.excerpt;
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
        dateOrder: eventDateRaw || 99, // For sorting - TBA goes to end
        categorySlug: category.slug,
        sortOrder: category.position || 999
      };
    });
    
    // Sort gatherings: first by date (so TBA items go to end), then by position
    const sortedGatherings = gatherings.sort((a, b) => {
      // First sort by date order (lower is earlier month)
      if (a.dateOrder !== b.dateOrder) {
        return a.dateOrder - b.dateOrder;
      }
      // Then by category position
      return a.sortOrder - b.sortOrder;
    });
    
    return sortedGatherings;
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
