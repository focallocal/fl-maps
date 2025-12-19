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

class UpcomingAndNews extends Component {
  state = {
    newsItems: [],
    newsLoading: true
  }

  componentDidMount () {
    this.fetchNews()
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
    const upcomingItems = upcomingContent.items || []
    const displayCount = upcomingContent.display_count || upcomingItems.length
    const { newsItems, newsLoading } = this.state

    return (
      <section className="upcoming-news-section">
        {/* Left Column: Upcoming International Gatherings */}
        <div className="section-column upcoming-column">
          {/* Title box */}
          <div className="title-box">
            <h2 className="section-title">
              {upcomingContent.title || 'Upcoming International Gatherings'}
            </h2>
          </div>

          {/* See all link - no border */}
          <a href={upcomingContent.see_all_url} className="see-all-link">
            See All →
          </a>

          {/* Individual gathering cards */}
          {upcomingItems.slice(0, displayCount).map((item, index) => (
            <div key={index} className="gathering-card">
              <div className="gathering-details">
                <h3 className="gathering-title">{item.title}</h3>
                <p className="gathering-date">{item.date}</p>
                <p className="gathering-text">{item.description}</p>
                <div className="gathering-actions">
                  <a href={item.build_url} className="action-btn build-btn">
                    Build
                  </a>
                  <a href={item.join_url} className="action-btn join-btn">
                    Join
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Latest Community News */}
        <div className="section-column news-column">
          {/* Title box */}
          <div className="title-box">
            <h2 className="section-title">
              {newsContent.title || 'Latest Community News'}
            </h2>
          </div>

          {/* See all link - no border */}
          <a href={newsContent.see_all_url} className="see-all-link">
            See All →
          </a>

          {/* Individual news cards */}
          {newsLoading ? (
            <div className="loading-box">Loading news...</div>
          ) : newsItems.length > 0 ? (
            newsItems.map((news, index) => (
              <a 
                key={index} 
                href={news.url} 
                className="news-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="news-content">
                  <h3 className="news-title">
                    {decodeHtmlEntities(news.title)}
                  </h3>
                  <p className="news-excerpt">
                    {decodeHtmlEntities(news.excerpt)}
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
