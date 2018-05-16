import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Route } from 'react-router-dom'
import { Button } from 'reactstrap'
import router from '/imports/client/utils/history'
import NewEventModal from '/imports/client/ui/components/NewEventModal'
import './styles.scss'

class NewEvent extends Component {
  render () {
    return (
      <div id='map--new-event'>
        <Button className='circle' onClick={this.openModal}>
          <i className='fas fa-plus' />
        </Button>
        <Route path='/map' render={({ location }) => {
          const isOpen = location.search === '?new=1'

          return (
            <NewEventModal
              isOpen={isOpen}
              toggleModal={this.closeModal}
            />
          )
        }} />
      </div>
    )
  }

  openModal () {
    // Allow modal only for users

    if (!Meteor.userId()) {
      sessionStorage.setItem('redirect', '/map?new=1')
      router.push('/sign-in')
    } else {
      router.push('/map?new=1')
    }
  }

  closeModal () {
    router.push('/map?new=0')
  }
}

export default NewEvent
