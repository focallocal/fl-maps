import React, { Component } from 'react'
import { CustomInput, Alert } from 'reactstrap'
import PropTypes from 'prop-types'
import AutoField from '/imports/client/utils/uniforms-custom/AutoField'
import labels from '/imports/both/i18n/en/new-event-modal.json'
import Categories from '/imports/both/i18n/en/categories.json'

const defaultName = Categories[0].name
const defaultColor = Categories[0].color

class FirstStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: null,
      foundResource: true,
      offerResource: false,
      resourceType: 'found',
      reset: false
    }
  }
  render () {
    const RadioButton = this.RadioButton

    return (
      <div id='first-step'>
        <div id='radios'>
          <label>{labels.resource_type.title}</label>
          <RadioButton
            id='foundResource'
            label={labels.resource_type.firstRadio}
            value={this.state.foundResource}
            type='radio'
            click={this.setCategories}
          />
          <RadioButton
            id='offerResource'
            label={labels.resource_type.secondRadio}
            value={this.state.offerResource}
            type='radio'
            click={this.noCategories}
          />
        </div>
        <AutoField name='overview' />
        <AutoField name='name' />
        <AutoField name='address' />
        { this.state.offerResource &&
          <Alert
            color='info'
            className='address-sub-label'>
            PS - for privacy reasons, we strongly suggest you use a public
            location nearby rather than your home address
          </Alert>
        }

        {/* {(this.state.resourceType === 'found') ? ( */}
        <AutoField name='categories'/>
        {/* ) : null } */}

      </div>
    )
  }
  noCategories = (type, value) => {
    this.setState({resourceType: null, foundResource: false, offerResource: true, reset: true})
  }

  setCategories = () => {
    this.setState({categories: [{}], resourceType: 'found', foundResource: true, offerResource: false})
  }

  RadioButton = ({ label, id, value, type, click }) => (
    <CustomInput
      id={id}
      type={type}
      label={label}
      checked={value === undefined ? false : value}
      onChange={() => {}}
      onClick={() => this.handleRadioButton(id, !value, click)}
    />
  )
  handleRadioButton = (type, value, click) => {
    const { categories } = this.props.form.getModel()
    if (type === 'offerResource') {
      this.props.form.change('categories', [{
        ...categories,
        resourceType: type === 'offerResource' && 'found',
        name: type === 'offerResource' && defaultName,
        color: type === 'offerResource' && defaultColor
      }])
    } else {
      // Empty array so that Community Resource never shows in the select field
      this.props.form.change('categories', [])
    }
    click()
  }
}

FirstStep.propTypes = {
  form: PropTypes.object
}

export default FirstStep
