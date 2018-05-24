import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import router from '/imports/client/utils/history'
import { Redirect } from 'react-router-dom'
import { EventsSchema } from '/imports/both/collections/events'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap'
import FormWizard from './FormWizard'
import i18n from '/imports/both/i18n/en'
import qs from 'query-string'
import './styles.scss'

const STEPS_COUNT = 2 // Number of form steps
const { NewEventModal: i18n_ } = i18n // Strings from i18n

class NewEventModal extends Component {
  state = {
    currentStep: 0,
    form: null,
    hasErrors: false
  }

  render () {
    const {
      currentStep,
      hasErrors
    } = this.state

    if (!Meteor.userId()) {
      sessionStorage.setItem('redirect', '?new=1')
      return <Redirect to='/sign-in' />
    }

    const isOpen = qs.parse(this.props.location.search).new === '1'

    return (
      <Modal id='new-event-modal' isOpen={isOpen} toggle={this.toggleModal} size='lg'>
        <ModalHeader toggle={this.toggleModal}>
          {i18n_.modal_header}
        </ModalHeader>

        <ModalBody>
          <Alert color='danger' isOpen={hasErrors}>
            Please check that you've filled all the necessary fields
          </Alert>
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
    this.state.form.validate({ clean: true })
      .then(() => {
        window.NProgress.set(0.4)

        const model = EventsSchema.clean(this.state.form.getModel())
        Meteor.call('Events.newEvent', model, (err, res) => {
          window.NProgress.done()
          if (!err) {
            this.setState({ currentStep: 0 }) // return to first step

            localStorage.setItem('new-event-id', res)
            router.push('/thank-you')
          }
          if (Meteor.isDevelopment) { console.log(err) }
        })
      })
      .catch(err => {
        this.setState({ hasErrors: true })

        if (Meteor.isDevelopment) { console.log(err.details) }

        setTimeout(() => {
          if (this.state.hasErrors) {
            this.setState({ hasErrors: false })
          }
        }, 4000) // auto- remove hasErrors message after 3 seconds
      })
  }

  getRef = (form) => {
    this.setState({ form: form })
  }

  toggleModal = () => {
    const { pathname, search } = this.props.location
    const queryStrings = qs.parse(search)
    queryStrings.new = '0'

    const url = pathname + '?' + qs.stringify(queryStrings)
    this.props.history.push(url)
  }
}

export default NewEventModal
