import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FormGroup, Input, Label } from 'reactstrap'
import RadioButton from './RadioButton'
import './styles.scss'
import { GoogleAddressInput } from './GoogleAddressInput';
import SearchableCategoryInput from './SearchableCategoryInput';

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
  defaultName = defaultCategory.name
  defaultColor = defaultCategory.color
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

const FirstStep = ({ form }) => {
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
    } else {
      form.change(name, value)
    }
  }

  const handleSearchableCategory = (e) => {
    const selectedOption = {
      name: e.value,
      color: e.color
    }

    form.change('categories', selectedOption);
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
        <RadioButton
          id='offerResource'
          label={labels.resource_type.secondRadio}
          value={state.offerResource}
          type='radio'
          click={noCategories}
          onRadioButtonClick={handleRadioButton}
          form={form}
        />
      </div>

      <FormGroup>
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

      <FormGroup>
        <Label for="overview">Overview</Label>
        <Input
          type="textarea"
          name="overview"
          id="overview"
          value={formData.overview || ''}
          onChange={handleInputChange}
          placeholder="Enter overview"
        />
      </FormGroup>

      <FormGroup>
        <GoogleAddressInput
          onPlaceSelected={(address) => {
            form.change('address', address);
          }}
        />
      </FormGroup>

      {state.offerResource &&
        <Alert
          color='info'
          className='address-sub-label'>
          PS - for privacy reasons, we strongly suggest you use a public
          location nearby rather than your home address
        </Alert>
      }

      <FormGroup>
        <SearchableCategoryInput
          groupedCategories={Categories}
          handleInputChange={handleSearchableCategory}
        />
      </FormGroup>

      {/*
      <FormGroup>
        <Label for="categories">Categories</Label>
        <Input
          type="select"
          name="categories"
          id="categories"
          // value={formData.categories || []}
          onChange={handleInputChange}
          className="categories-select"
        >
          {Categories.map((category, index) => (
            <option key={index} value={category.name}>{category.name}</option>
          ))}
        </Input>
      </FormGroup>*/}
    </div>

  )
}

FirstStep.propTypes = {
  form: PropTypes.object
}

export default FirstStep
