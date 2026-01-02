// @ts-nocheck
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import i18n from '/imports/both/i18n/en'

// Helper to decode HTML entities
const decodeHtmlEntities = (text) => {
  if (!text) return ''
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

// Helper to strip HTML tags, links, and images from text
const stripHtmlAndLinks = (text) => {
  if (!text) return ''
  // Remove img tags and their content
  let cleaned = text.replace(/<img[^>]*>/gi, '')
  // Remove anchor tags but keep their text content
  cleaned = cleaned.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1')
  // Remove any remaining HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, '')
  // Remove URLs (http/https links)
  cleaned = cleaned.replace(/https?:\/\/[^\s]+/gi, '')
  // Remove Discourse image placeholders - match any text followed by dimensions and file size
  // Patterns like: "image 708x912 40.1KB", "connectioncanvas london2015aug (10) 480x360 77KB"
  cleaned = cleaned.replace(/[\w\s()-]*\d+x\d+\s*[\d.]+\s*[KMG]?B/gi, '')
  // Remove lines that start with bullet points followed by image-like content
  cleaned = cleaned.replace(/^\s*[-•]\s*[\w\s()-]*\d+x\d+.*$/gim, '')
  // Remove standalone dimensions like "708x912" or "480x360"
  cleaned = cleaned.replace(/\b\d+x\d+\b/gi, '')
  // Remove file sizes like "40.1KB" or "77KB" 
  cleaned = cleaned.replace(/\b[\d.]+\s*[KMG]?B\b/gi, '')
  // Remove isolated "image" word that might remain
  cleaned = cleaned.replace(/\bimage\b/gi, '')
  // Clean up bullet points and dashes that might remain
  cleaned = cleaned.replace(/^\s*[-•]\s*$/gm, '')
  cleaned = cleaned.replace(/\s*-\s*-\s*/g, ' ')
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim()
  return cleaned
}

class UpcomingAndNews extends Component {
  state = {
    newsItems: [],
    newsLoading: true,
    imageOrientations: {} // Track image orientations: { index: 'portrait' | 'landscape' }
  }

  componentDidMount () {
    this.fetchNews()
  }

  // Detect if image is portrait or landscape
  handleImageLoad = (e, index) => {
    const img = e.target
    const isPortrait = img.naturalHeight > img.naturalWidth
    this.setState(prevState => ({
      imageOrientations: {
        ...prevState.imageOrientations,
        [index]: isPortrait ? 'portrait' : 'landscape'
      }
    }))
  }

  // Format date from YYYY-MM-DD to readable format
  formatDate = (dateStr) => {
    if (!dateStr) return 'TBA'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // Get gatherings from i18n sorted by date
  getGatherings = () => {
    const upcomingContent = i18n.NewHomepage?.upcoming_gatherings || {}
    const items = upcomingContent.items || []
    
    // Sort by date (earliest first)
    return [...items].sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(a.date) - new Date(b.date)
    })
  }

  fetchNews = () => {
    const newsContent = i18n.NewHomepage?.latest_news || {}
    const limit = newsContent.items_count || 3
    
    // Fetch latest news from Discourse
    Meteor.call('Discourse.getLatestNews', { limit }, (error, result) => {
      if (!error && result) {
        this.setState({
          newsItems: result,
          newsLoading: false
        })
      } else {
        this.setState({ newsLoading: false })
      }
    })
  }

  render () {
    const upcomingContent = i18n.NewHomepage?.upcoming_gatherings || {}
    const newsContent = i18n.NewHomepage?.latest_news || {}
    const gatheringItems = this.getGatherings()
    const { newsItems, newsLoading, imageOrientations } = this.state

    return (
      <section className="upcoming-news-section">
        {/* Left Column: Upcoming International Gatherings */}
        <div className="section-column upcoming-column">
          {/* Title box with See All inside */}
          <div className="title-box">
            <h2 className="section-title">
              {upcomingContent.title || 'Upcoming International Gatherings'}
            </h2>
            <a href={upcomingContent.see_all_url} className="see-all-btn">
              See All
            </a>
          </div>

          {/* Individual gathering cards with images */}
          {gatheringItems.length > 0 ? (
            gatheringItems.map((item, index) => (
              <a 
                key={index} 
                href={item.url}
                className="gathering-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src={item.image || '/images/home-images/PHM-logo-banner-text-mid.svg'} 
                  alt={item.title}
                  className="gathering-image"
                  onError={(e) => {
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = 'true'
                      e.target.src = '/images/home-images/PHM-logo-banner-text-mid.svg'
                    }
                  }}
                />
                <div className="gathering-details">
                  <span className={`gathering-date${!item.date ? ' tba' : ''}`}>
                    {this.formatDate(item.date)}
                  </span>
                  <h3 className="gathering-title">{item.title}</h3>
                  <p className="gathering-text">
                    {item.description}
                    <span className="read-more">... read more</span>
                  </p>
                </div>
              </a>
            ))
          ) : (
            <div className="no-data-box">No upcoming gatherings</div>
          )}
        </div>

        {/* Right Column: Latest Community News */}
        <div className="section-column news-column">
          {/* Title box with See All inside */}
          <div className="title-box">
            <h2 className="section-title">
              {newsContent.title || 'Latest Community News'}
            </h2>
            <a href={newsContent.see_all_url} className="see-all-btn">
              See All
            </a>
          </div>

          {/* Individual news cards with images */}
          {newsLoading ? (
            <div className="loading-box">Loading news...</div>
          ) : newsItems.length > 0 ? (
            newsItems.map((news, index) => (
              <a 
                key={index} 
                href={news.url} 
                className={`news-card ${imageOrientations[index] || ''}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src={news.image || '/images/home-images/PHM-logo-banner-text-mid.svg'} 
                  alt={decodeHtmlEntities(news.title)}
                  className="news-image"
                  onLoad={(e) => this.handleImageLoad(e, index)}
                  onError={(e) => {
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = 'true'
                      e.target.src = '/images/home-images/PHM-logo-banner-text-mid.svg'
                    }
                  }}
                />
                <div className="news-content">
                  <h3 className="news-title">
                    {decodeHtmlEntities(news.title)}
                  </h3>
                  <p className="news-excerpt">
                    {stripHtmlAndLinks(decodeHtmlEntities(news.excerpt))}
                    <span className="read-more">... read more</span>
                  </p>
                </div>
              </a>
            ))
          ) : (
            <div className="no-news-box">No recent news available</div>
          )}
        </div>
      </section>
    )
  }
}

export default UpcomingAndNews
