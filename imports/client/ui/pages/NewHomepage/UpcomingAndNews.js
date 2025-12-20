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
    gatheringItems: [],
    gatheringsLoading: true,
    newsItems: [],
    newsLoading: true
  }

  componentDidMount () {
    this.fetchGatherings()
    this.fetchNews()
  }

  fetchGatherings = () => {
    const upcomingContent = i18n.NewHomepage?.upcoming_gatherings || {}
    const limit = upcomingContent.items_count || 6
    
    // Fetch upcoming gatherings from Discourse mass-kindness category
    Meteor.call('Discourse.getUpcomingGatherings', { limit }, (error, result) => {
      if (!error && result) {
        this.setState({
          gatheringItems: result,
          gatheringsLoading: false
        })
      } else {
        this.setState({ gatheringsLoading: false })
      }
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
    const { gatheringItems, gatheringsLoading, newsItems, newsLoading } = this.state

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
          {gatheringsLoading ? (
            <div className="loading-box">Loading gatherings...</div>
          ) : gatheringItems.length > 0 ? (
            gatheringItems.map((item, index) => (
              <a 
                key={index} 
                href={item.url}
                className="gathering-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={decodeHtmlEntities(item.title)}
                    className="gathering-image"
                    onError={(e) => {
                      if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = 'true'
                        e.target.src = '/images/home-images/PHM-logo-banner-text-mid.svg'
                      }
                    }}
                  />
                )}
                <div className="gathering-details">
                  {item.date && <span className="gathering-date">{item.date}</span>}
                  {!item.date && <span className="gathering-date tba">TBA</span>}
                  <h3 className="gathering-title">{decodeHtmlEntities(item.title)}</h3>
                  <p className="gathering-text">
                    {decodeHtmlEntities(item.excerpt)}
                    <span className="read-more">...read more</span>
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
                className="news-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                {news.image && (
                  <img 
                    src={news.image} 
                    alt={decodeHtmlEntities(news.title)}
                    className="news-image"
                    onError={(e) => {
                      if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = 'true'
                        e.target.src = '/images/home-images/PHM-logo-banner-text-mid.svg'
                      }
                    }}
                  />
                )}
                <div className="news-content">
                  <h3 className="news-title">
                    {decodeHtmlEntities(news.title)}
                  </h3>
                  <p className="news-excerpt">
                    {decodeHtmlEntities(news.excerpt)}
                    <span className="read-more">...read more</span>
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
