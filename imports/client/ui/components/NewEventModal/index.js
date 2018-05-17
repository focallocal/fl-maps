import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import router from '/imports/client/utils/history'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import AutoForm from '/imports/client/utils/uniforms-custom/AutoForm'
import { EventsSchema } from '/imports/both/collections/events'
import FormWizard from './FormWizard'
import i18n from '/imports/both/i18n/en'
import './styles.scss'

const STEPS_COUNT = 1
const { NewEventModal: i18n_ } = i18n
class NewEventModal extends Component {
  state = {
    currentStep: 0
  };

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
          {i18n_.modal_header}
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
  };

  moveBack = () => {
    this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }))
  };

  submit = () => {
    this.form.validate()
      .then(() => {
        window.NProgress.set(0.4)

        const model = EventsSchema.clean(this.form.getModel())
        Meteor.call('Events.newEvent', model, (err, res) => {
          if (!err) {
            localStorage.setItem('new-event-id', res)
            router.push('/thank-you')
          }
          window.NProgress.done()
        })
      })
      .catch(err => console.log(err))
  };

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

export default NewEventModal
