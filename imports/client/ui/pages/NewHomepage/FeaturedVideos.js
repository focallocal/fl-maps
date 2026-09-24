// @ts-nocheck
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from '/imports/both/i18n/en';

class FeaturedVideos extends Component {
  state = {
    videos: [],
    loading: true
  };

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos = () => {
    const content = i18n.NewHomepage?.featured_videos || {};
    const playlistId = content.playlist_id;
    const limit = content.items_count || 6;

    if (!playlistId) {
      this.setState({ loading: false });
      return;
    }

    Meteor.call('Youtube.getLatestVideos', { playlistId, limit }, (error, result) => {
      if (!error && result) {
        this.setState({ videos: result, loading: false });
      } else {
        if (error) {
          console.error('[FeaturedVideos] Youtube.getLatestVideos failed:', error);
        }
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const content = i18n.NewHomepage?.featured_videos || {};
    const { videos, loading } = this.state;

    return (
      <section className="featured-videos-section">
        <div className="title-box">
          <h2 className="section-title">{content.title || 'Latest Featured Videos'}</h2>
          <a href={content.see_all_url} className="see-all-btn" target="_top">
            {content.see_all_btn || 'See All'}
          </a>
        </div>

        {loading ? (
          <div className="loading-box">Loading videos...</div>
        ) : videos.length > 0 ? (
          <div className="videos-grid">
            {videos.map((video, index) => (
              <div key={index} className="video-card">
                <div className="video-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="video-title">{video.title}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-box">No videos available</div>
        )}
      </section>
    );
  }
}

export default FeaturedVideos;
