import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AutoForm from '/imports/client/utils/uniforms-custom/AutoForm'
import { EventsSchema } from '/imports/both/collections/events'
import { getHour } from '/imports/both/collections/events/helpers'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

class FormWizard extends Component {
  state = {
    reset: false
  }

  render () {
    const {
      currentStep
    } = this.props

    // console.log(this.form)
    let model = this.form ? this.form.getModel() : this.loadModelFromStorage()

    if (this.state.reset) {
      localStorage.removeItem('new-event-model') // remove the draft
      model = this.loadModelFromStorage() // will return an initial model object
    }

    return (
      <AutoForm
        schema={EventsSchema}
        model={model}
        ref={this.setRef}
        onChangeModel={this.saveModelToStorage}
      >
        {this.form ? (
          <Fragment>
            <span className='reset' onClick={this.resetForm}>reset fields</span>
            {currentStep === 0 && <FirstStep />}
            {currentStep === 1 && <SecondStep form={this.form} />}
            {currentStep === 2 && <ThirdStep />}
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

  saveModelToStorage (model) {
    localStorage.setItem('new-event-model', JSON.stringify(model))
  }

  loadModelFromStorage (context) {
    const model = localStorage.getItem('new-event-model')

    if (model != null) {
      return EventsSchema.clean(JSON.parse(model))
    }

    return {
      when: { // This is important - it ensures that we start with a default value for the "when" object.
        startingDate: new Date(),
        endingDate: new Date(),
        startingTime: getHour(),
        endingTime: getHour(1)
      }
    }
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
