import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import AutoForm from '/imports/client/utils/uniforms-custom/AutoForm'
import { EventsSchema } from '/imports/both/collections/events'
import { getHour } from '/imports/both/collections/events/helpers'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'

class FormWizard extends Component {
  state = {
    reset: false
  }

  render () {
    const {
      currentStep,
      editMode
    } = this.props

    let model = this.form ? this.form.getModel() : this.loadModelFromStorage()

    if (editMode && window.__editData) {
      model = {...window.__editData}
      delete window.__editData // only needed on 1st renderer, afterwards the data will be retrieved via getModel
    }

    if (this.state.reset) {
      model = this.loadModelFromStorage(true)
    }

    return (
      <AutoForm
        schema={EventsSchema}
        model={model}
        ref={this.setRef}
      >
        {this.form ? (
          <Fragment>
            <Button
              outline
              color='secondary'
              className='reset'
              onClick={this.resetForm}>
              Clear all fields
            </Button>
            {currentStep === 0 && <FirstStep form={this.form} />}
            {currentStep === 1 && <SecondStep form={this.form} />}
          </Fragment>
        ) : <div />}
      </AutoForm>
    )
  }

  resetForm = () => {
    this.form.reset()
    this.setState({ reset: true })

    setTimeout(() => {
      this.setState({ reset: false })
    }, 500) // a hack to update the component's state so it doesn't reset on next re-renders.
  }

  loadModelFromStorage (empty) {
    // on fields reset, get rid of any previously unfinished New Event
    if(empty === true){
      delete window.__unfinishedNewEvent
    }

    let initialObject;

    if('__unfinishedNewEvent' in window){
      initialObject = window.__unfinishedNewEvent
    } else {
      initialObject = EventsSchema.clean({}, { mutate: true }) // get default values
      initialObject.when = {
        startingTime: getHour(),
        endingTime: getHour(3),
        recurring: { forever: true },
        repeat: false
      }
    }

    return initialObject
  }

  setRef = ref => {
    this.form = ref
    this.props.passFormRefToParent(ref)
  }
}

FormWizard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  passFormRefToParent: PropTypes.func.isRequired
}

export default FormWizard
