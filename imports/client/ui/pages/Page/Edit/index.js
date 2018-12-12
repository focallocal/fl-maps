import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import './styles.scss'

class EditPage extends Component {
  render () {
    return (
      <div id='edit-page'>
        <Button color='primary' onClick={this.openEditModal}>
          Edit Page
          <i className="far fa-edit" />
        </Button>
      </div>
    )
  }

  openEditModal = () => {
    window.__editData = this.props.data
    this.props.history.push('?edit=1')
  }
}

EditPage.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default EditPage
