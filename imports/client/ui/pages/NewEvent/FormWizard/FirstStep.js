import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FormGroup, Input, Label } from 'reactstrap'
import RadioButton from './RadioButton'
import { GoogleAddressInput } from './GoogleAddressInput';
import SearchableCategoryInput from './SearchableCategoryInput';
import './styles.scss'

import i18n from '/imports/both/i18n/en'

let labels = i18n.NewEventModal
let Categories = i18n.Categories
let defaultName
let defaultColor

if (window.__mapType === 'gatherings') {
  defaultName = Categories[0].name
  defaultColor = Categories[0].color
} else if (window.__mapType === 'btm') {
  let defaultCategory = findDefaultCategory(Categories)
  if (defaultCategory) {
    defaultName = defaultCategory.name
    defaultColor = defaultCategory.color
  }
}

function findDefaultCategory (C) {
  let category
  C.forEach(ele => {
    if (category == null) {
      category = ele.categories.find(ele => {
        return ele.default === true
      })
    }
  })
  return category
}

const FirstStep = ({ form, onChange, errors }) => {
  const [state, setState] = React.useState({
    categories: null,
    foundResource: true,
    offerResource: false,
    resourceType: 'found',
    reset: false
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'categories') {
      const selectedOptions = Array.from(e.target.selectedOptions, option => ({
        name: option.value,
        color: Categories.find(cat => cat.name === option.value)?.color || defaultColor
      }))
      form.change(name, selectedOptions)
      onChange(name, value)
    } else {
      onChange(name, value)
      form.change(name, value)
    }
  }

  const handleSearchableCategory = (e) => {
    if (e) {
      const selectedOption = {
        name: e.value,
        color: e.color
      }

      form.change('categories', selectedOption);
    }
  }

  const noCategories = (type, value) => {
    setState({
      ...state,
      resourceType: null,
      foundResource: false,
      offerResource: true,
      reset: true
    })
  }

  const setCategories = () => {
    setState({
      ...state,
      categories: [{}],
      resourceType: 'found',
      foundResource: true,
      offerResource: false
    })
  }

  const handleRadioButton = (type, value, click) => {
    const { categories } = form.getModel()
    if (type === 'offerResource') {
      form.change('categories', [{
        resourceType: 'found',
        name: defaultName,
        color: defaultColor
      }])
    } else if (type === 'foundResource') {
      form.change('categories', [])
    }
    
    setState(prevState => ({
      ...prevState,
      foundResource: type === 'foundResource' ? value : false,
      offerResource: type === 'offerResource' ? value : false,
      resourceType: type === 'offerResource' ? 'found' : null
    }))
    
    if (click) {
      click()
    }
  }

  const formData = form?.getModel?.() || {}

  return (
    <div id='first-step'>
      
      <div id='radios'>
        <label>{labels.resource_type.title}</label>
        <RadioButton
          id='foundResource'
          label={labels.resource_type.firstRadio}
          value={state.foundResource}
          type='radio'
          click={setCategories}
          onRadioButtonClick={handleRadioButton}
          form={form}
        />
        {/* This comments hides the "Put yourself on the map radio button" */}
        {/*
          <RadioButton
            id='offerResource'
            label={labels.resource_type.secondRadio}
            value={state.offerResource}
            type='radio'
            click={noCategories}
            onRadioButtonClick={handleRadioButton}
            form={form}
          />
        */}
      </div>
      
      <div className="mb-3">
        <FormGroup noMargin={true}>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </FormGroup>
        
        {errors?.name && (!formData?.name || formData.name.trim() === '') && (
          <div className="text-danger">{errors.name}</div>
        )}
      </div>

      <div className="mb-3">
        <FormGroup noMargin={true}>
          <Label for="overview">Overview</Label>
          <Input
            type="textarea"
            name="overview"
            id="overview"
            value={formData.overview || ''}
            onChange={(e) => {
              const value = e.target.value
              form.change('overview', value)

              // Clear error when text length is 20 or more
              if (errors?.overview && value.trim().length >= 10) {
                form.change('errors.overview', null)
              }
            }}
            placeholder="Enter overview"
            minLength={20}
            maxLength={300}
          />
        </FormGroup>
        <div className="text-muted small">
          {formData.overview?.length || 0} / 300
        </div>
        {errors?.overview && (!formData?.overview || formData.overview.trim().length < 10) && (
          <div className="text-danger">{errors.overview}</div>
        )}
      </div>
      
      <div className="mb-3">
        <FormGroup noMargin={true}>
          <GoogleAddressInput
            onPlaceSelected={(address) => {
              form.change('address', address);
            }}
          />
        </FormGroup>
        {errors?.address && (!formData?.address || formData.address.name.trim() === '') && (
          <div className="text-danger">{errors.address}</div>
        )}
      </div>

      {state.offerResource &&
        <Alert
          color='info'
          className='address-sub-label'>
          PS - for privacy reasons, we strongly suggest you use a public
          location nearby rather than your home address
        </Alert>
      }

      <div className='mb-3'>
        <FormGroup noMargin={true}>
          <SearchableCategoryInput
            groupedCategories={Categories}
            handleInputChange={handleSearchableCategory}
          />
        </FormGroup>
        {errors?.category && (!formData?.category || formData.category.trim() === '') && (
            <div className="text-danger">{errors.category}</div>
        )}
      </div>
    </div>

  )
}

FirstStep.propTypes = {
  form: PropTypes.object
}

export default FirstStep
