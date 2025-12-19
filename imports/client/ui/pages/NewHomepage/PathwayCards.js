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

  renderUserThumbnails = (users, maxShow = 10) => {
    const displayUsers = users.slice(0, maxShow);
    const remaining = users.length - maxShow;

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
              e.target.src = '/images/default-avatar.png';
            }}
          />
        ))}
        {remaining > 0 && (
          <span className="more-users">+{remaining > 300 ? '300+' : remaining}</span>
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
        {/* Gatherings (Local) Card */}
        <div className="pathway-card gatherings">
          <div className="pathway-header">
            <h2 className="pathway-title">{gatherings.title || 'Gatherings (Local)'}</h2>
            <a href={gatherings.see_all_url} className="see-all-link">See All</a>
          </div>
          <div className="pathway-content">
            <div className="pathway-icons">
              <a href={gatherings.map_url} className="pathway-icon-link">
                <img 
                  src="/images/home-images/Homepage Maps.jpg" 
                  alt="Map" 
                  className="pathway-icon"
                />
              </a>
              <a href={gatherings.forum_url} className="pathway-icon-link">
                <img 
                  src="/images/home-images/Homepage Forum.jpg" 
                  alt="Forum" 
                  className="pathway-icon"
                />
              </a>
            </div>
            <p className="pathway-description">{gatherings.description}</p>
          </div>
          {this.renderUserThumbnails(gatheringsUsers)}
        </div>

        {/* Projects (Global) Card */}
        <div className="pathway-card projects">
          <div className="pathway-header">
            <h2 className="pathway-title">{projects.title || 'Projects (Global)'}</h2>
            <a href={projects.see_all_url} className="see-all-link">See All</a>
          </div>
          <div className="pathway-content">
            <div className="pathway-icons">
              <a href={projects.map_url} className="pathway-icon-link">
                <img 
                  src="/images/home-images/Homepage Maps.jpg" 
                  alt="Map" 
                  className="pathway-icon"
                />
              </a>
              <a href={projects.forum_url} className="pathway-icon-link">
                <img 
                  src="/images/home-images/Homepage Forum.jpg" 
                  alt="Forum" 
                  className="pathway-icon"
                />
              </a>
            </div>
            <p className="pathway-description">{projects.description}</p>
          </div>
          {this.renderUserThumbnails(projectsUsers)}
        </div>
      </section>
    );
  }
}

export default PathwayCards;
