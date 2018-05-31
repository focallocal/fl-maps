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

    let model = this.form ? this.form.getModel() : this.loadModelFromStorage()

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

  loadModelFromStorage (empty) {
    let initialObject = EventsSchema.clean({}, { mutate: true }) // get default values
    initialObject.when = {
      startingTime: getHour(),
      endingTime: getHour(3),
      recurring: { forever: true },
      repeat: false
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
