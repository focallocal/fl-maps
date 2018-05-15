import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'

class FormWizard extends Component {

  render () {
    const {
      currentStep
    } = this.props

    return (
      <Fragment>

        {currentStep === 0 && <FirstStep />}
        {currentStep === 1 && <SecondStep />}

      </Fragment>
    )
  }
}

FormWizard.propTypes = {
  currentStep: PropTypes.number.isRequired
}

export default FormWizard
