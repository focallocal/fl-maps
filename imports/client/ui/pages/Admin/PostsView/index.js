import React, { Component } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import './styles.scss';

class PostsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      selectedPosts: new Set(),
      totalCount: 0,
      searchQuery: '',
      searchFilter: 'title', // 'title', 'user', 'location', 'category'
      sortBy: 'dateNewest', // 'dateNewest', 'dateOldest', 'mostAttendees', 'alphabetical', 'category', 'location'
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    // Reload posts when search/filter/sort changes
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.searchFilter !== this.state.searchFilter ||
      prevState.sortBy !== this.state.sortBy
    ) {
      this.loadPosts();
    }
  }

  loadPosts = () => {
    this.setState({ loading: true });

    const { searchQuery, searchFilter, sortBy } = this.state;

    Meteor.call(
      'Admin.getPosts',
      { searchQuery, searchFilter, sortBy },
      (error, result) => {
        if (error) {
          console.error('Error loading posts:', error);
          this.setState({ loading: false });
        } else {
          this.setState({
            posts: result.posts || [],
            totalCount: result.totalCount || 0,
            loading: false,
          });
        }
      }
    );
  };

  handleSelectAll = (e) => {
    const { posts } = this.state;
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
      
      Meteor.call('Admin.deletePosts', postIds, (error) => {
        if (error) {
          alert('Error deleting posts: ' + error.message);
        } else {
          this.setState({ selectedPosts: new Set() });
          this.loadPosts();
        }
      });
    }
  };

  handleDeleteSingle = (postId, postName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${postName}"?`
    );
    
    if (confirmDelete) {
      Meteor.call('Admin.deletePosts', [postId], (error) => {
        if (error) {
          alert('Error deleting post: ' + error.message);
        } else {
          this.loadPosts();
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

  formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  formatLocation = (address) => {
    if (!address) return 'N/A';
    return address.name || address.city || 'Unknown';
  };

  formatCategories = (categories) => {
    if (!categories || categories.length === 0) return 'None';
    return categories.map(c => c.name).join(', ');
  };

  renderRow = ({ index, style }) => {
    const { posts, selectedPosts } = this.state;
    const post = posts[index];
    
    if (!post) return null;

    const isSelected = selectedPosts.has(post._id);

    return (
      <div className="post-row" style={style}>
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
          
          <div className="post-organizer" title={post.organiser?.name}>
            {post.organiser?.name || 'Unknown'}
          </div>
          
          <div className="post-location" title={this.formatLocation(post.address)}>
            {this.formatLocation(post.address)}
          </div>
          
          <div className="post-categories" title={this.formatCategories(post.categories)}>
            {this.formatCategories(post.categories)}
          </div>
          
          <div className="post-date">
            {this.formatDate(post.when || post.createdAt)}
          </div>
          
          <div className="post-actions">
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
    const { posts, loading, selectedPosts, totalCount, searchQuery, searchFilter, sortBy } = this.state;
    const hasSelection = selectedPosts.size > 0;
    const allSelected = posts.length > 0 && selectedPosts.size === posts.length;

    return (
      <div className="posts-view">
        <div className="posts-controls">
          <div className="search-section">
            <FormGroup className="search-input-group">
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={this.handleSearchChange}
              />
            </FormGroup>
            
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
          </div>

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

        {loading ? (
          <div className="posts-loading">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="posts-empty">No posts found</div>
        ) : (
          <List
            height={600}
            itemCount={posts.length}
            itemSize={60}
            width="100%"
            className="posts-list"
          >
            {this.renderRow}
          </List>
        )}

        <div className="posts-footer">
          Total: {totalCount} post{totalCount !== 1 ? 's' : ''}
        </div>
      </div>
    );
  }
}

export default PostsView;
