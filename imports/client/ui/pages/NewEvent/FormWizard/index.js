import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button } from 'reactstrap'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import { EventsSchema } from '/imports/both/collections/events'
import { getHour } from '/imports/both/collections/events/helpers'

class FormWizard extends Component {
  state = {
    reset: false,
    formData: null,
    errors: {}
  }

  render () {
    const {
      currentStep,
      editMode
    } = this.props

    let model = this.form ? this.form.getModel() : this.loadModelFromStorage()

    if (editMode && window.__editData) {
      model = { ...window.__editData }
      delete window.__editData // only needed on 1st renderer, afterwards the data will be retrieved via getModel
    }

    if (this.state.reset) {
      model = this.loadModelFromStorage(true)
    }

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
    const errors = this.validateForm()
    if (Object.keys(errors).length === 0) {
      // Handle form submission
      this.props.onSubmit?.(this.state.formData)
    } else {
      this.setState({ errors })
    }
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

  /*validate = ({ clean }) => {
    return new Promise((resolve, reject) => {
      const model = this.getModel()
      const errors = {}

      // Validate required fields
      Object.keys(EventsSchema._schema).forEach(field => {
        const fieldSchema = EventsSchema._schema[field]
        if (fieldSchema.optional === false && !model[field]) {
          errors[field] = 'This field is required'
        }
      })

      if (Object.keys(errors).length > 0) {
        this.setState({ errors })
        reject({ details: errors })
      } else {
        if (clean) {
          // Clean the model according to schema
          const cleanModel = EventsSchema.clean(model)
          this.setState({ formData: cleanModel })
        }
        resolve()
      }
    })
  }*/

    /*
  validate = ({ clean }) => {
    return new Promise((resolve, reject) => {
      const model = this.getModel();
      const errors = {};

      // Helper to safely access nested properties (e.g., "when.endingDate")
      const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
      };

      // Validate required fields
      Object.keys(EventsSchema._schema).forEach(field => {
        const fieldSchema = EventsSchema._schema[field];
        const value = getNestedValue(model, field);

        if (fieldSchema.optional === false && (value === undefined || value === '')) {
          errors[field] = 'This field is required';
        }
      });

      if (Object.keys(errors).length > 0) {
        this.setState({ errors });
        reject({ details: errors });
      } else {
        if (clean) {
          const cleanModel = EventsSchema.clean(model);
          this.setState({ formData: cleanModel });
        }
        resolve();
      }
    });
  };*/

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
      delete window.__unfinishedNewEvent
    }

    let initialObject

    if ('__unfinishedNewEvent' in window) {
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

  componentDidMount() {
    const initialData = this.loadModelFromStorage()
    this.setState({ formData: initialData })
    this.props.passFormRefToParent(this)
  }
}

FormWizard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  passFormRefToParent: PropTypes.func.isRequired
}

export default FormWizard
