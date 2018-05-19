import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import AutoForm from '/imports/client/utils/uniforms-custom/AutoForm'
import { EventsSchema } from '/imports/both/collections/events'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import './DateTimeModule/styles.scss'

class FormWizard extends Component {
  render () {
    const {
      currentStep
    } = this.props

    const model = this.form ? this.form.getModel() : this.loadModelFromStorage()

    return (
      <AutoForm
        schema={EventsSchema}
        model={model}
        ref={this.setRef}
        onChangeModel={this.saveModelToStorage}
      >
        {this.form ? (
          <Fragment>
            <FirstStep show={currentStep === 0}/>
            <SecondStep show={currentStep === 1} form={this.form} />
            <ThirdStep show={currentStep === 2} />
          </Fragment>
        ) : <div />}
      </AutoForm>
    )
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
      address: {},
      categories: {},
      when: {}
    }
  }

  setRef = ref => {
    this.form = ref
    this.props.passFormRefToParent(ref)
  }
}

FormWizard.propTypes = {
  currentStep: PropTypes.number.isRequired
}

export default FormWizard
