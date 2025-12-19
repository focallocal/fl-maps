// @ts-nocheck
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from '/imports/both/i18n/en';

class PathwayCards extends Component {
  state = {
    gatheringsUsers: [],
    projectsUsers: [],
    loading: true
  };

  componentDidMount() {
    this.fetchActiveUsers();
  }

  fetchActiveUsers = () => {
    // Fetch active users from both Map (React) and Forum (Discourse)
    Meteor.call('Discourse.getActiveUsers', { days: 7 }, (error, result) => {
      if (!error && result) {
        this.setState({
          gatheringsUsers: result.gatherings || [],
          projectsUsers: result.projects || [],
          loading: false
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  renderUserThumbnails = (users) => {
    // Only show users who are actually active (have a score > 0)
    const activeUsers = users.filter(u => u.score > 0);
    
    // Show as many as fit - we'll use CSS to handle overflow
    // Maximum reasonable display before "+N" is around 50-60 avatars
    const maxDisplay = 60;
    const displayUsers = activeUsers.slice(0, maxDisplay);
    const remaining = activeUsers.length - maxDisplay;

    if (displayUsers.length === 0) {
      return null;
    }

    return (
      <div className="pathway-users">
        {displayUsers.map((user, index) => (
          <img
            key={index}
            src={user.avatar}
            alt={user.username}
            className="user-avatar"
            title={user.username}
            onError={(e) => {
              if (!e.target.dataset.fallback) {
                e.target.dataset.fallback = 'true';
                e.target.src = '/images/default-avatar.png';
              }
            }}
          />
        ))}
        {remaining > 0 && (
          <span className="more-users">+{remaining}</span>
        )}
      </div>
    );
  };

  render() {
    const content = i18n.NewHomepage?.pathways || {};
    const gatherings = content.gatherings || {};
    const projects = content.projects || {};
    const { gatheringsUsers, projectsUsers } = this.state;

    return (
      <section className="pathway-section">
        {/* Gatherings (Local) Card - Shows Map image */}
        <div className="pathway-card gatherings">
          <div className="pathway-header">
            <h2 className="pathway-title">{gatherings.title || 'Gatherings (Local)'}</h2>
            <a href={gatherings.see_all_url} className="see-all-link">See All</a>
          </div>
          <div className="pathway-body">
            <a href={gatherings.map_url} className="pathway-image-link">
              <img 
                src="/images/home-images/Homepage Maps.jpg" 
                alt="Map" 
                className="pathway-image"
              />
            </a>
            <div className="pathway-right">
              <p className="pathway-description">{gatherings.description}</p>
              {this.renderUserThumbnails(gatheringsUsers)}
            </div>
          </div>
        </div>

        {/* Projects (Global) Card - Shows Forum image */}
        <div className="pathway-card projects">
          <div className="pathway-header">
            <h2 className="pathway-title">{projects.title || 'Projects (Global)'}</h2>
            <a href={projects.see_all_url} className="see-all-link">See All</a>
          </div>
          <div className="pathway-body">
            <a href={projects.forum_url} className="pathway-image-link">
              <img 
                src="/images/home-images/Homepage Forum.jpg" 
                alt="Forum" 
                className="pathway-image"
              />
            </a>
            <div className="pathway-right">
              <p className="pathway-description">{projects.description}</p>
              {this.renderUserThumbnails(projectsUsers)}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PathwayCards;
