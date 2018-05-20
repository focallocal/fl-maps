import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import router from '/imports/client/utils/history'
import { EventsSchema } from '/imports/both/collections/events'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import FormWizard from './FormWizard'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const STEPS_COUNT = 2 // Number of form steps
const { NewEventModal: i18n_ } = i18n // Strings from i18n

class NewEventModal extends Component {
  state = {
    currentStep: 1,
    form: null
  }

  render () {
    const {
      isOpen,
      toggleModal
    } = this.props

    const { currentStep } = this.state

    return (
      <Modal id='new-event-modal' isOpen={isOpen} toggle={toggleModal} size='lg'>
        <ModalHeader toggle={toggleModal}>
          {i18n_.modal_header}
        </ModalHeader>

        <ModalBody>
          <FormWizard currentStep={currentStep} passFormRefToParent={this.getRef} />
        </ModalBody>

        <ModalFooter>
          {currentStep + 1 <= STEPS_COUNT &&
            <Button color='primary' onClick={this.moveNext}>Next</Button>
          }
          {currentStep === STEPS_COUNT &&
            <Button color='primary' onClick={this.submit} className='submit'>Submit</Button>
          }
          {currentStep > 0 &&
            <Button color='primary' onClick={this.moveBack}>Back</Button>
          }
        </ModalFooter>
      </Modal>
    )
  }

  moveNext = () => {
    this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }))
  };

  moveBack = () => {
    this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }))
  };

  submit = () => {
    this.state.form.validate()
      .then(() => {
        window.NProgress.set(0.4)

        const model = EventsSchema.clean(this.state.form.getModel())
        Meteor.call('Events.newEvent', model, (err, res) => {
          if (!err) {
            localStorage.setItem('new-event-id', res)
            router.push('/thank-you')
          }
          window.NProgress.done()
          console.log(err, res)
        })
      })
      .catch(err => console.log(err))
  }

  getRef = (form) => {
    this.setState({ form: form })
  }
}

NewEventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default NewEventModal
