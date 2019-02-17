import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { EventsSchema } from '/imports/both/collections/events'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap'
import FormWizard from './FormWizard'
import i18n from '/imports/both/i18n/en'
import qs from 'query-string'
import cloneDeep from 'clone-deep'
import './styles.scss'

const { NewEventModal: i18n_ } = i18n // Strings from i18n

class NewEventModal extends Component {
  constructor () {
    super()
    this.state = {
      currentStep: 0,
      editMode: false,
      form: null,
      googleLoaded: false,
      hasErrors: false,
      isRedirect: false,
      isConfirmBtn: false
    }

    if (window.google) {
      this.state.googleLoaded = true
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (window.__editData) {
      return {
        ...nextProps,
        editMode: true,
        isRedirect: false,
        isConfirmBtn: false
      }
    }
    return {
      ...nextProps,
      editMode: false,
      isRedirect: false,
      isConfirmBtn: false,
    } 
  }

  componentDidMount () {
    // ensure google maps is loaded
    this.interval = setInterval(() => {
      if (window.google) {
        clearInterval(this.interval)
        this.setState({ googleLoaded: true })
      }
    }, 1000) // 1 second
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname){
      delete window.__unfinishedNewEvent
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.interval = null
  }

  render () {
    if (this.state.isRedirect === true) {
      return <Redirect to='/map' />
    }
    const {
      currentStep,
      editMode,
      googleLoaded,
      hasErrors,
      isOpen
    } = this.state

    const hasGoogleMapsLoaded = window.google || googleLoaded

    const header = i18n_.modal_header
    const isConfirmBtn = this.state.isConfirmBtn
    const deleteBtn = editMode && currentStep + 1 <= 1 ? <Button color='danger' onClick={() => this.setState({ isConfirmBtn: true })}>Delete Page</Button> : null

    return hasGoogleMapsLoaded && (
      <Modal id='new-event-modal' isOpen={isOpen} toggle={this.toggleModal} size='lg'>
        <ModalHeader toggle={this.toggleModal}>
          {editMode ? header.replace('New', 'Edit') : header}
        </ModalHeader>
        <ModalBody>
          <FormWizard
            currentStep={currentStep}
            passFormRefToParent={this.getRef}
            editMode={editMode} />
        </ModalBody>
        <Alert color='danger' isOpen={hasErrors} toggle={this.toggleErrors} className='error-general'>
          Please check that <strong>all necessary fields</strong> (outlined in <strong>red</strong>) 
          <strong> are filled out</strong>.
        </Alert>
        {isConfirmBtn ?
          <ModalFooter>
            <Button color='primary' onClick={() => this.setState({ isConfirmBtn: false })}>Cancel</Button>
            <Button color='danger' onClick={this.deletePage}>CONFIRM DELETE</Button>

          </ModalFooter>
          :
          <ModalFooter>
            {currentStep + 1 <= 1 &&
              <Button color='primary' onClick={this.moveNext}>Next</Button>
            }
            {deleteBtn}
            {currentStep === 1 &&
              <Button color='primary' onClick={this.submit} className='submit'>Submit</Button>
            }
            {currentStep > 0 &&
              <Button color='primary' onClick={this.moveBack}>Back</Button>
            }
          </ModalFooter>
        }
      </Modal>
    )
  }

  moveNext = () => {
    this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }))
  };

  moveBack = () => {
    this.setState(prevState => ({ currentStep: prevState.currentStep - 1, hasErrors: false }))
  };

  submit = () => {
    this.state.form.validate({ clean: true })
      .then(() => {
        window.NProgress.set(0.4)

        let model = EventsSchema.clean(this.state.form.getModel())
        if (this.state.editMode) {
          model._id = this.state.form.getModel()._id
          this.callEditEvent(model)
        } else {
          this.callNewEvent(model)
        }
      })
      .catch(err => {
        this.setState({ hasErrors: true })

        if (Meteor.isDevelopment) { console.log(err.details, err) }
      })

      // get rid of any previously unfinished New Event
      delete window.__unfinishedNewEvent
  }

  deletePage = () => {
    let model = EventsSchema.clean(this.state.form.getModel())
    model._id = this.state.form.getModel()._id
    this.callDeleteEvent(model);
  }

  callNewEvent = model => {
    Meteor.call('Events.newEvent', model, (err, res) => {
      if (!err) {
        this.setState({ currentStep: 0 }) // return to first step
        window.__recentEvent = { ...model, _id: res }
        this.props.history.push('/thank-you')
      }

      window.NProgress.done()
      if (Meteor.isDevelopment) { console.log(err) }
    })
  }

  callEditEvent = (model) => {
    Meteor.call('Events.editEvent', model, (err, res) => {
      if (!err) {
        window.__updatedData = model // update event page.
        this.setState({ currentStep: 0 })
        this.props.history.push('/page/' + model._id)
      }

      window.NProgress.done()
      if (Meteor.isDevelopment) { console.log(err, model) }
    })
  }

  callDeleteEvent = (model) => {
    Meteor.call('Events.deleteEvent', model, (err, res) => {
      if (!err) {
        this.setState({ isRedirect: true })
      }

      if (Meteor.isDevelopment) { console.log(err, model) }
    })

  }

  toggleModal = () => {
    const { pathname, search } = this.props.location
    const queryStrings = qs.parse(search)

    delete queryStrings.edit
    delete queryStrings.new

    const url = pathname + '?' + qs.stringify(queryStrings)
    this.props.history.push(url)

    // toggleModal() closes modal, but it is not called after form submits  
    // copy unfinished form to global window and check for it inside FormWizard 
    window.__unfinishedNewEvent = cloneDeep(this.state.form.getModel())
  }

  toggleErrors = () => this.setState({ hasErrors: false })

  getRef = (form) => {
    this.setState({ form: form })
  }
}

NewEventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default NewEventModal
