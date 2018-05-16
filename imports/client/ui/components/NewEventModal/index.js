import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import AutoForm from 'uniforms-unstyled/AutoForm'
import { EventsSchema } from '/imports/both/collections/events'
import FormWizard from './FormWizard'
import './styles.scss'

const STEPS_COUNT = 1
class NewEventModal extends Component {

  state = {
    currentStep: 0
  }

  render () {
    const {
      isOpen,
      toggleModal
    } = this.props

    const {
      currentStep
    } = this.state

    const model = this.form ? this.form.getModel() : this.loadModelFromStorage()

    return (
      <Modal id='new-event-modal' isOpen={isOpen} toggle={toggleModal} size='lg'>
        <ModalHeader toggle={toggleModal}>
          New Event
        </ModalHeader>

        <ModalBody>
          <AutoForm
            schema={EventsSchema}
            model={model}
            ref={form => this.form = form}
            onChangeModel={this.saveModelToStorage}
          >
            <FormWizard currentStep={currentStep} />
          </AutoForm>
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
  }

  moveBack = () => {
    this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }))
  }

  submit = () => {
    this.form.validate()
      .then(() => {
        const model = EventsSchema.clean(this.form.getModel())
        window.NProgress.set(0.4)
        Meteor.call('Events.newEvent', model, (err, res) => {
          if (!err) {
            localStorage.setItem('new-event-id', res)
            this.props.history.push('/thank-you')
          }
          window.NProgress.done()
        })
      })
      .catch(err => console.log(err))
  }

  saveModelToStorage (model) {
    localStorage.setItem('new-event-model', JSON.stringify(model))
  }

  loadModelFromStorage (context) {
    const model = localStorage.getItem('new-event-model')

    if (model != null) {
      return EventsSchema.clean(JSON.parse(model))
    }
    return {}
  }
}

NewEventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default withRouter(NewEventModal)
