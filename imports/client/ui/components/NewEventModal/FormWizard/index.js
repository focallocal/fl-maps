import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import './DateTimeModule/styles.scss'

class FormWizard extends Component {
  render () {
    const {
      currentStep,
      form
    } = this.props

    return (
      <Fragment>

        <FirstStep show={currentStep === 0}/>
        <SecondStep show={currentStep === 1} form={form} />
        <ThirdStep show={currentStep === 2} />

      </Fragment>
    )
  }
}

FormWizard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired
}

export default FormWizard
