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
    // Fetch latest news from Discourse
    Meteor.call('Discourse.getLatestNews', { limit: 3 }, (error, result) => {
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
    const { newsItems, newsLoading } = this.state

    return (
      <section className="upcoming-news-section">
        {/* Left Column: Upcoming International Gatherings */}
        <div className="section-column upcoming-column">
          <div className="section-header">
            <h2 className="section-title">
              {upcomingContent.title || 'Upcoming International Gatherings'}
            </h2>
            <a href={upcomingContent.see_all_url} className="see-all-link">
              See All
            </a>
          </div>

          <div className="cards-container">
            {upcomingItems.map((item, index) => (
              <div key={index} className="gathering-card">
                <div className="gathering-image-section">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gathering-image"
                    onError={(e) => {
                      e.target.src = '/images/home-images/placeholder.jpg'
                    }}
                  />
                  <div className="gathering-date">{item.date}</div>
                </div>
                <div className="gathering-details">
                  <h3 className="gathering-title">{item.title}</h3>
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
        </div>

        {/* Right Column: Latest Community News */}
        <div className="section-column news-column">
          <div className="section-header">
            <h2 className="section-title">
              {newsContent.title || 'Latest Community News'}
            </h2>
            <a href={newsContent.see_all_url} className="see-all-link">
              See All
            </a>
          </div>

          <div className="cards-container">
            {newsLoading ? (
              <div className="loading">Loading news...</div>
            ) : newsItems.length > 0 ? (
              newsItems.map((news, index) => (
                <div key={index} className="news-card">
                  {news.image && (
                    <img
                      src={news.image}
                      alt={decodeHtmlEntities(news.title)}
                      className="news-image"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
                  <div className="news-content">
                    <h3 className="news-title">
                      {decodeHtmlEntities(news.title)}
                    </h3>
                    <p className="news-excerpt">
                      {decodeHtmlEntities(news.excerpt)}
                    </p>
                    <a href={news.url} className="read-more-link">
                      Read More →
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-news">No recent news available</div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default UpcomingAndNews
