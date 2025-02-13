import React, { Component } from 'react'
import connectField from 'uniforms/connectField'
import Select from 'react-select'
import { FormGroup, Label } from 'reactstrap';

import PlacesSearchBox from '/imports/client/ui/components/PlacesSearchBox'
// import categoryTree from '/imports/both/i18n/en/categories.json'
import { formatReactSelectOptions } from '../format'

import i18n from '/imports/both/i18n/en'
let categoryTree = i18n.Categories


// We need the list of parent categories in order to disable them in the category dropdown
// (because these are subheadings in the dropdown -> user selects the actual child category instead)
const parentCategories = categoryTree.map(elem => elem.name)

class Select_ extends Component {
  constructor (props) {
    super()
    const { labelKey, labelMapper } = props.selectOptions || {}

    this.state = {
      options: formatReactSelectOptions(props.allowedValues, labelKey, labelMapper),
      indexes: null // if not null, we have multiple values that will be mapped with those indexes
    }
  }

  render () {
    const {
      options
    } = this.state

    const {
      label,
      placeholder_,
      value,
      selectOptions = {},
      error
    } = this.props

    const {
      googleMaps,
      multi,
      url
    } = selectOptions

    const className = 'select-field ' + (error ? 'error' : '')

    let value_ = this.getValues(value)

    return (
      <FormGroup className={className}>
        <Label>{label}</Label>
        {/* Displays a different kind of dropdown depending on the url and googleMaps props */}
        {url && (
          <Select
            value={value_}
            options={options}
            isMulti={multi}
            isSearchable={false}
            onChange={this.handleChange}
            placeholder={''}
            menuPlacement='top'
          />
        )}
        {!url && !googleMaps && (
          <Select
            value={value_}
            // options={options}
            options={options.map(elem => {
              // NOTE: this adds custom styling to options that are in fact parent categories (style them as subheadings)
              if (parentCategories.includes(elem.label)) {
                return {
                  value: elem.value,
                  label: `---${elem.label}---`
                }
              } else return elem
            })}
            isMulti={multi}
            onChange={this.handleChange}
            placeholder={placeholder_}
            isSearchable={false}
            menuPlacement='auto'
            isOptionDisabled={(option) => {
              // NOTE: this stops user from being able to select options that are in fact parent categories
              return parentCategories.includes(option.label.slice(3, option.label.length-3))
            }}
          />
        )}
        {googleMaps && (
          <PlacesSearchBox
            onSelect={value => this.handlePlacesChange(value)}
            address={value ? value.name : null}
            placeholder={placeholder_}
            invalid={!!error}
          />
        )}
      </FormGroup>
    )
  }

  handleChange = value => {
    /*
      React-Select returns values in the following format -> { value: '', label: '' }
      We must extract the value field so it can match our SimpleSchema defintion.
      The value is an index to the options array so we save all indexes into an array
      so we can map them upon rendering
    */

    const { onChange, allowedValues, selectOptions = {} } = this.props

    if (selectOptions.multi) {
      let indexes = []
      const values = value.reduce((arr, val) => {
        indexes.push(val.value)
        return arr.concat(allowedValues[val.value])
      }, [])

      onChange(values)
      this.setState({ indexes })
    } else {
      onChange(allowedValues[value.value])
      this.setState({ indexes: [value.value] })
    }
  }

  handlePlacesChange = value => {
    const { onChange } = this.props
    const {
      name,
      lat,
      lng
    } = value

    onChange({
      name,
      location: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    })
  }

  getValues = (value) => {
    const { indexes } = this.state
    const { allowedValues, selectOptions = {} } = this.props
    const { multi, labelKey } = selectOptions

    let value_ = value
    if (indexes) {
      // See handleChange below to understand why we have to map the values by indexes
      if (!Array.isArray(value_)) {
        value_ = [value]
      }
      value_ = value_.reduce((arr, val, index) => {
        return val ? arr.concat({ value: indexes[index], label: val[labelKey] || val }) : arr
      }, [])
    } else if (multi) {
      // If multi is true but indexes are null, we have to map the value/label from
      // the allowedValues array (this usually happens after a refresh)
      // this might be slow but should happen only once (we usually want to use the indexes mapper)
      value_ = value_.reduce((arr, val) => {
        const valueIndex = allowedValues.findIndex(obj => obj[labelKey] === val[labelKey])
        return arr.concat({ value: valueIndex, label: val[labelKey] })
      }, [])
    } else if (!Array.isArray(value_) && (typeof value_) !== 'object') {
      // If we got here, then the value is a primitive and we dont have an index to map by

      const valueIndex = allowedValues.findIndex(v => v === value_)
      value_ = [{ value: valueIndex, label: value_ }]
    }

    return value_
  }
}

export default connectField(Select_)