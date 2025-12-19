// @ts-nocheck
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import i18n from '/imports/both/i18n/en';

class Leaderboards extends Component {
  state = {
    leaderboardData: {},
    loading: true
  };

  componentDidMount() {
    this.fetchLeaderboards();
  }

  fetchLeaderboards = () => {
    // Fetch gamification leaderboards from Discourse
    Meteor.call('Discourse.getLeaderboards', (error, result) => {
      if (!error && result) {
        this.setState({
          leaderboardData: result,
          loading: false
        });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  renderLeaderboard = (board) => {
    const { leaderboardData, loading } = this.state;
    const data = leaderboardData[board.id] || [];

    return (
      <div key={board.id} className="leaderboard-card">
        <h3 className="leaderboard-title">{board.title}</h3>
        <p className="leaderboard-subtitle">{board.subtitle}</p>
        
        <div className="leaderboard-entries">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : data.length > 0 ? (
            data.slice(0, 5).map((entry, index) => (
              <div key={index} className="leaderboard-entry">
                <span className="entry-rank">{index + 1}</span>
                <img 
                  src={entry.avatar} 
                  alt={entry.username} 
                  className="entry-avatar"
                  onError={(e) => {
                    e.target.src = '/images/default-avatar.png';
                  }}
                />
                <span className="entry-name">{entry.username}</span>
                <span className="entry-score">{entry.score}</span>
              </div>
            ))
          ) : (
            <div className="no-data">No data available</div>
          )}
        </div>
      </div>
    );
  };

  render() {
    const content = i18n.NewHomepage?.leaderboards || {};
    const boards = content.boards || [];

    return (
      <section className="leaderboards-section">
        <div className="section-header">
          <h2 className="section-title">{content.title || 'Community Leaderboards'}</h2>
        </div>
        
        <div className="leaderboards-grid">
          {boards.map(board => this.renderLeaderboard(board))}
        </div>
      </section>
    );
  }
}

export default Leaderboards;
