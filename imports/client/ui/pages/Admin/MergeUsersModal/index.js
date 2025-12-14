import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import i18n from '/imports/both/i18n/en';

const mergeI18n = i18n.Admin.merge;

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
      this.setState({ error: mergeI18n.selectBoth });
      return;
    }

    if (sourceUserId === targetUserId) {
      this.setState({ error: mergeI18n.cannotMergeSelf });
      return;
    }

    const sourceUser = this.props.users.find(u => u._id === sourceUserId);
    const targetUser = this.props.users.find(u => u._id === targetUserId);

    const confirmMessage = `${mergeI18n.confirmMerge} "${sourceUser?.profile?.name || sourceUser?.username}" ${mergeI18n.confirmMergeInto} "${targetUser?.profile?.name || targetUser?.username}"?\n\n${mergeI18n.confirmMergeDetails}`;

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
        <ModalHeader toggle={toggle}>{mergeI18n.header}</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          {success && <Alert color="success">{success}</Alert>}
          
          <p className="text-muted">
            {mergeI18n.instructions}
          </p>

          <FormGroup>
            <Label for="sourceUser">{mergeI18n.sourceLabel}</Label>
            <Input
              type="select"
              id="sourceUser"
              value={sourceUserId}
              onChange={(e) => this.setState({ sourceUserId: e.target.value, error: null })}
              disabled={loading}
            >
              <option value="">{mergeI18n.selectSource}</option>
              {sortedUsers.map(user => (
                <option key={user._id} value={user._id}>
                  {user.profile?.name || user.username || 'Unknown'} ({user.username})
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="targetUser">{mergeI18n.targetLabel}</Label>
            <Input
              type="select"
              id="targetUser"
              value={targetUserId}
              onChange={(e) => this.setState({ targetUserId: e.target.value, error: null })}
              disabled={loading}
            >
              <option value="">{mergeI18n.selectTarget}</option>
              {sortedUsers.map(user => (
                <option key={user._id} value={user._id}>
                  {user.profile?.name || user.username || 'Unknown'} ({user.username})
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle} disabled={loading}>{mergeI18n.cancelBtn}</Button>
          <Button color="danger" onClick={this.handleMerge} disabled={loading}>
            {loading ? mergeI18n.mergingBtn : mergeI18n.mergeBtn}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MergeUsersModal;
