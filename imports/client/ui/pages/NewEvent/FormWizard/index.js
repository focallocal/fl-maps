import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'reactstrap'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import { EventsSchema } from '/imports/both/collections/events'
import { getHour } from '/imports/both/collections/events/helpers'
import cloneDeep from 'clone-deep'

class FormWizard extends Component {
  state = {
    reset: false,
    formData: null,
    errors: {}
  }

  render () {
    const { currentStep } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Button
          outline
          color='secondary'
          className='reset'
          onClick={this.resetForm}>
          Clear all fields
        </Button>
        {currentStep === 0 && <FirstStep form={this} onChange={this.handleChange} errors={this.state.errors} />}
        {currentStep === 1 && <SecondStep form={this} onChange={this.handleChange} errors={this.state.errors} />}
      </form>
    )
  }

  resetForm = (e) => {
    e.preventDefault()
    const initialData = this.loadModelFromStorage(true)
    this.setState({
      reset: true,
      formData: initialData,
      errors: {}
    })

    setTimeout(() => {
      this.setState({ reset: false })
    }, 500)
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (field, value) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [field]: value
      }
    }))
  }

  getModel = () => {
    return this.state.formData
  }

  change = (field, value) => {
    this.handleChange(field, value)
  }


  validate = ({ clean } = {}) => {
    return new Promise((resolve, reject) => {
      const model = this.getModel() || {};
      const doc = clean ? EventsSchema.clean({ ...model }) : model; // clean does NOT validate

      const ctx = EventsSchema.newContext();
      const isValid = ctx.validate(doc); // <-- this enforces min/max/etc.

      if (!isValid) {
        const errors = {};
        ctx.validationErrors().forEach(err => {
          // err.name is the field path, e.g. "overview"
          // Friendly message for the field:
          errors[err.name] = ctx.keyErrorMessage(err.name);
        });
        this.setState({ errors });
        reject({ details: errors });
        return;
      }

      this.setState({ formData: doc, errors: {} });
      resolve();
    });
  };

  loadModelFromStorage (empty) {
    // on fields reset, get rid of any previously unfinished New Event
    if (empty === true) {
      delete window['__unfinishedNewEvent']
    }

    let initialObject

    if (Object.prototype.hasOwnProperty.call(window, '__unfinishedNewEvent')) {
      initialObject = cloneDeep(window['__unfinishedNewEvent'])
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

  componentDidMount() {
    let initialData

    if (this.props.editMode && window['__editData']) {
      initialData = cloneDeep(window['__editData'])
      delete window['__editData']
    } else {
      initialData = this.loadModelFromStorage()
    }

    this.setState({ formData: initialData })
    this.props.passFormRefToParent(this)
  }
}

FormWizard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  passFormRefToParent: PropTypes.func.isRequired
}

export default FormWizard
