import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import NewEventModal from '/imports/client/ui/components/NewEventModal'
import './styles.scss'

class NewEvent extends Component {

  state = {
    isModalOpen: false
  }

  render () {
    const {
      isModalOpen
    } = this.state

    return (
      <div id='map--new-event'>
        <Button className='circle' onClick={this.toggleModal}>
          <i className='fas fa-plus' />
        </Button>
        <NewEventModal
          isOpen={isModalOpen}
          toggleModal={this.toggleModal}
        />
      </div>
    )
  }

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
  }
}

NewEvent.propTypes = {

}

export default NewEvent
