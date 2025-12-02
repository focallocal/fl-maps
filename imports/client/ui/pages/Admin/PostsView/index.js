import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { FixedSizeList as List } from 'react-window';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import './styles.scss';

class PostsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPosts: new Set(),
      searchQuery: '',
      searchFilter: 'title', // 'title', 'user', 'location', 'category'
      sortBy: 'dateNewest', // 'dateNewest', 'dateOldest', 'alphabetical', 'category', 'location'
      allPosts: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadAllPosts();
  }

  loadAllPosts = () => {
    this.setState({ isLoading: true });
    Meteor.call('Admin.getPosts', { searchQuery: '', searchFilter: 'title', sortBy: 'dateNewest' }, (err, res) => {
      if (err) {
        console.error('Error loading posts:', err);
        this.setState({ isLoading: false });
      } else {
        this.setState({ 
          allPosts: (res && res.posts) || [], 
          isLoading: false 
        });
      }
    });
  };

  getFilteredAndSortedPosts = () => {
    const { allPosts } = this.state;
    const { searchQuery, searchFilter, sortBy } = this.state;

    if (!allPosts || allPosts.length === 0) {
      return [];
    }

    // Filter posts based on search
    let filteredPosts = allPosts;
    
    if (searchQuery && searchQuery.trim().length > 0) {
      const query = searchQuery.trim().toLowerCase();
      
      filteredPosts = allPosts.filter(event => {
        switch (searchFilter) {
          case 'title':
            return event.name && event.name.toLowerCase().includes(query);
          case 'user':
            return event.organiser && event.organiser.name && 
                   event.organiser.name.toLowerCase().includes(query);
          case 'location':
            return (event.address && event.address.name && event.address.name.toLowerCase().includes(query)) ||
                   (event.address && event.address.city && event.address.city.toLowerCase().includes(query)) ||
                   (event.address && event.address.country && event.address.country.toLowerCase().includes(query));
          case 'category':
            return event.categories && event.categories.some(cat => 
              cat.name && cat.name.toLowerCase().includes(query)
            );
          default:
            return true;
        }
      });
    }

    // Sort posts
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case 'dateNewest': {
          const aDate = (a.when && a.when.startingDate) ? new Date(a.when.startingDate).getTime() : (a.createdAt || 0);
          const bDate = (b.when && b.when.startingDate) ? new Date(b.when.startingDate).getTime() : (b.createdAt || 0);
          return bDate - aDate;
        }
        case 'dateOldest': {
          const aDate = (a.when && a.when.startingDate) ? new Date(a.when.startingDate).getTime() : (a.createdAt || 0);
          const bDate = (b.when && b.when.startingDate) ? new Date(b.when.startingDate).getTime() : (b.createdAt || 0);
          return aDate - bDate;
        }
        case 'alphabetical':
          return (a.name || '').localeCompare(b.name || '');
        case 'category':
          const aCat = a.categories && a.categories[0] ? a.categories[0].name : '';
          const bCat = b.categories && b.categories[0] ? b.categories[0].name : '';
          return aCat.localeCompare(bCat);
        case 'location':
          const aLoc = a.address && a.address.city ? a.address.city : '';
          const bLoc = b.address && b.address.city ? b.address.city : '';
          return aLoc.localeCompare(bLoc);
        case 'mostAttendees':
          const aCount = a.engagement?.attendees?.length || 0;
          const bCount = b.engagement?.attendees?.length || 0;
          return bCount - aCount;
        default:
          return 0;
      }
    });

    return sortedPosts;
  };

  componentDidUpdate(prevProps, prevState) {
    // Clear selection when search/filter/sort changes
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.searchFilter !== this.state.searchFilter ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.setState({ selectedPosts: new Set() });
    }
  }

  handleSelectAll = (e) => {
    const posts = this.getFilteredAndSortedPosts();
    if (e.target.checked) {
      const allPostIds = new Set(posts.map(p => p._id));
      this.setState({ selectedPosts: allPostIds });
    } else {
      this.setState({ selectedPosts: new Set() });
    }
  };

  handleSelectPost = (postId) => {
    const { selectedPosts } = this.state;
    const newSelected = new Set(selectedPosts);
    
    if (newSelected.has(postId)) {
      newSelected.delete(postId);
    } else {
      newSelected.add(postId);
    }
    
    this.setState({ selectedPosts: newSelected });
  };

  handleDeleteSelected = () => {
    const { selectedPosts } = this.state;
    const count = selectedPosts.size;
    
    if (count === 0) return;
    
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${count} post${count > 1 ? 's' : ''}?`
    );
    
    if (confirmDelete) {
      const postIds = Array.from(selectedPosts);
      let deletedCount = 0;
      let errorCount = 0;
      
      // Delete each post with delay to avoid rate limiting (2 per 5 seconds)
      postIds.forEach((postId, index) => {
        setTimeout(() => {
          Meteor.call('Events.deleteEvent', { _id: postId }, (error) => {
            if (error) {
              console.error(`Failed to delete post ${postId}:`, error);
              errorCount++;
            } else {
              deletedCount++;
            }
            
            // When all deletions are complete
            if (deletedCount + errorCount === postIds.length) {
              if (errorCount > 0) {
                alert(`Deleted ${deletedCount} post(s). ${errorCount} failed.`);
              }
              this.setState({ selectedPosts: new Set() });
              // Reload posts and notify parent
              this.loadAllPosts();
              if (this.props.onDeletePosts) {
                this.props.onDeletePosts();
              }
            }
          });
        }, index * 2600); // 2600ms delay between each delete (slightly more than 5000ms / 2)
      });
    }
  };

  handleDeleteSingle = (postId, postName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${postName}"?`
    );
    
    if (confirmDelete) {
      Meteor.call('Events.deleteEvent', { _id: postId }, (error) => {
        if (error) {
          console.error(`Failed to delete post ${postId}:`, error);
          alert('Error deleting post: ' + error.message);
        } else {
          // Reload posts and notify parent
          this.loadAllPosts();
          if (this.props.onDeletePosts) {
            this.props.onDeletePosts();
          }
        }
      });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleFilterChange = (filter) => {
    this.setState({ searchFilter: filter });
  };

  handleSortChange = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  formatDate = (event) => {
    // Try to get the event date from when.startingDate or createdAt
    let date = null;
    
    if (event.when && event.when.startingDate) {
      date = event.when.startingDate;
    } else if (event.createdAt) {
      date = event.createdAt;
    }
    
    if (!date) return 'N/A';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  formatLocation = (address) => {
    if (!address) return 'N/A';
    
    // Try to build a descriptive location string
    const parts = [];
    if (address.city) parts.push(address.city);
    if (address.country) parts.push(address.country);
    
    if (parts.length > 0) return parts.join(', ');
    if (address.name) return address.name;
    
    return 'Unknown';
  };

  formatCategories = (categories) => {
    if (!categories || !Array.isArray(categories) || categories.length === 0) return 'None';
    return categories.map(c => c.name).join(', ');
  };

  renderRow = ({ index, style, data }) => {
    const { posts, selectedPosts } = data;
    const post = posts[index];
    
    if (!post) return null;

    const isSelected = selectedPosts.has(post._id);

    return (
      <div className={`post-row ${isSelected ? 'selected' : ''}`} style={style}>
        <div className="post-row-content">
          <div className="post-checkbox">
            <Input
              type="checkbox"
              checked={isSelected}
              onChange={() => this.handleSelectPost(post._id)}
            />
          </div>
          
          <div className="post-name" title={post.name}>
            {post.name || 'Untitled Post'}
          </div>
          
          <div className="post-organizer" title={post.organiser?.name || post.organiser?.username || 'Unknown'}>
            <div className="organizer-name">{post.organiser?.name || post.organiser?.username || 'Unknown'}</div>
            {post.organiser?.username && (
              <div className="organizer-email">{post.organiser.username}</div>
            )}
          </div>
          
          <div className="post-location" title={this.formatLocation(post.address)}>
            {this.formatLocation(post.address)}
          </div>
          
          <div className="post-categories" title={this.formatCategories(post.categories)}>
            {this.formatCategories(post.categories)}
          </div>
          
          <div className="post-date">
            {this.formatDate(post)}
          </div>
          
          <div className="post-actions">
            <Link to={`/page/${post._id}`}>
              <Button
                size="sm"
                color="info"
                className="me-1"
              >
                Go To
              </Button>
            </Link>
            <Button
              size="sm"
              color="danger"
              onClick={() => this.handleDeleteSingle(post._id, post.name)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const filteredAndSortedPosts = this.getFilteredAndSortedPosts();
    const { selectedPosts, searchQuery, searchFilter, sortBy, isLoading } = this.state;
    const hasSelection = selectedPosts.size > 0;
    const allSelected = filteredAndSortedPosts.length > 0 && selectedPosts.size === filteredAndSortedPosts.length;

    return (
      <div className="posts-view">
        <div className="posts-controls">
          <div className="filter-buttons">
            <Button
              size="sm"
              color={searchFilter === 'title' ? 'primary' : 'secondary'}
              onClick={() => this.handleFilterChange('title')}
            >
              Title
            </Button>
            <Button
              size="sm"
              color={searchFilter === 'user' ? 'primary' : 'secondary'}
              onClick={() => this.handleFilterChange('user')}
            >
              User
            </Button>
            <Button
              size="sm"
              color={searchFilter === 'location' ? 'primary' : 'secondary'}
              onClick={() => this.handleFilterChange('location')}
            >
              Location
            </Button>
            <Button
              size="sm"
              color={searchFilter === 'category' ? 'primary' : 'secondary'}
              onClick={() => this.handleFilterChange('category')}
            >
              Category
            </Button>
          </div>
          
          <FormGroup className="search-input-group">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
          </FormGroup>

          <div className="sort-section">
            <FormGroup>
              <Label for="sortSelect">Sort by:</Label>
              <Input
                type="select"
                id="sortSelect"
                value={sortBy}
                onChange={this.handleSortChange}
              >
                <option value="dateNewest">Date (Newest)</option>
                <option value="dateOldest">Date (Oldest)</option>
                <option value="mostAttendees">Most Attendees</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="category">By Category</option>
                <option value="location">By Location</option>
              </Input>
            </FormGroup>
          </div>
        </div>

        <div className="bulk-actions">
          {hasSelection && (
            <Button
              color="danger"
              onClick={this.handleDeleteSelected}
            >
              Delete Selected ({selectedPosts.size})
            </Button>
          )}
        </div>

        <div className="posts-header">
          <div className="post-row-content">
            <div className="post-checkbox">
              <Input
                type="checkbox"
                checked={allSelected}
                onChange={this.handleSelectAll}
              />
            </div>
            <div className="post-name"><strong>Title</strong></div>
            <div className="post-organizer"><strong>Organizer</strong></div>
            <div className="post-location"><strong>Location</strong></div>
            <div className="post-categories"><strong>Categories</strong></div>
            <div className="post-date"><strong>Date</strong></div>
            <div className="post-actions"><strong>Actions</strong></div>
          </div>
        </div>

        {this.state.isLoading ? (
          <div className="posts-loading">Loading posts...</div>
        ) : filteredAndSortedPosts.length === 0 ? (
          <div className="posts-empty">No posts found</div>
        ) : (
          <List
            height={600}
            itemCount={filteredAndSortedPosts.length}
            itemSize={60}
            width="100%"
            className="posts-list"
            itemData={{ posts: filteredAndSortedPosts, selectedPosts: this.state.selectedPosts }}
          >
            {this.renderRow}
          </List>
        )}

        <div className="posts-footer">
          Total: {filteredAndSortedPosts.length} post{filteredAndSortedPosts.length !== 1 ? 's' : ''}
        </div>
      </div>
    )
  }
}

export default PostsView;
