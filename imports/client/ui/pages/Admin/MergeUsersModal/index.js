import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Alert } from 'reactstrap';

class MergeUsersModal extends Component {
  state = {
    sourceUserId: '',
    targetUserId: '',
    loading: false,
    error: null,
    success: null
  };

  handleMerge = () => {
    const { sourceUserId, targetUserId } = this.state;

    if (!sourceUserId || !targetUserId) {
      this.setState({ error: 'Please select both users' });
      return;
    }

    if (sourceUserId === targetUserId) {
      this.setState({ error: 'Cannot merge user with itself' });
      return;
    }

    const sourceUser = this.props.users.find(u => u._id === sourceUserId);
    const targetUser = this.props.users.find(u => u._id === targetUserId);

    const confirmMessage = `Are you sure you want to merge "${sourceUser?.profile?.name || sourceUser?.username}" INTO "${targetUser?.profile?.name || targetUser?.username}"?\n\nThis will:\n- Transfer all events from source to target user\n- Merge roles\n- DELETE the source user\n\nThis action CANNOT be undone!`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    this.setState({ loading: true, error: null });

    Meteor.call('Admin.mergeUsers', { sourceUserId, targetUserId }, (err, result) => {
      this.setState({ loading: false });
      
      if (err) {
        this.setState({ error: err.reason || err.message });
      } else {
        this.setState({ 
          success: result.message,
          sourceUserId: '',
          targetUserId: ''
        });
        
        // Refresh users list
        if (this.props.onMergeComplete) {
          this.props.onMergeComplete();
        }
        
        // Close modal after 2 seconds
        setTimeout(() => {
          this.setState({ success: null });
          this.props.toggle();
        }, 2000);
      }
    });
  };

  render() {
    const { isOpen, toggle, users } = this.props;
    const { sourceUserId, targetUserId, loading, error, success } = this.state;

    // Sort users alphabetically
    const sortedUsers = [...users].sort((a, b) => {
      const nameA = a.profile?.name || a.username || '';
      const nameB = b.profile?.name || b.username || '';
      return nameA.localeCompare(nameB);
    });

    return (
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Merge Duplicate Users</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          {success && <Alert color="success">{success}</Alert>}
          
          <p className="text-muted">
            Select the user to merge FROM (will be deleted) and the user to merge INTO (will be kept).
            All events will be transferred to the target user.
          </p>

          <FormGroup>
            <Label for="sourceUser">Source User (will be DELETED)</Label>
            <Input
              type="select"
              id="sourceUser"
              value={sourceUserId}
              onChange={(e) => this.setState({ sourceUserId: e.target.value, error: null })}
              disabled={loading}
            >
              <option value="">-- Select user to merge from --</option>
              {sortedUsers.map(user => (
                <option key={user._id} value={user._id}>
                  {user.profile?.name || user.username || 'Unknown'} ({user.username})
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="targetUser">Target User (will be KEPT)</Label>
            <Input
              type="select"
              id="targetUser"
              value={targetUserId}
              onChange={(e) => this.setState({ targetUserId: e.target.value, error: null })}
              disabled={loading}
            >
              <option value="">-- Select user to merge into --</option>
              {sortedUsers.map(user => (
                <option key={user._id} value={user._id}>
                  {user.profile?.name || user.username || 'Unknown'} ({user.username})
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} disabled={loading}>Cancel</Button>
          <Button color="danger" onClick={this.handleMerge} disabled={loading}>
            {loading ? 'Merging...' : 'Merge Users'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MergeUsersModal;
