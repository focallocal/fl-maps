import React, { Component } from 'react'
import { connectField } from 'uniforms'
import { FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import { determinePosition } from '/imports/both/collections/events/helpers'

class Select_ extends Component {
  state = {
    options: [],
    suggestions: []
  }

  componentDidMount () {
    const { options } = this.props

    if (options) {
      this.setState({ options })
    }
  }

  render () {
    const {
      label,
      placeholder,
      error,
      disabled,
      required,
      customType,
      defaultValue,
      value
    } = this.props

    const { options, suggestions } = this.state

    return (
      <FormGroup>
        <Label>{label}</Label>
        {customType === 'location' ? (
          <PlacesAutocomplete
            inputProps={{
              placeholder,
              className: 'form-control' + (error ? ' invalid' : ''),
              value: value || ''
            }}
            onChange={this.handleLocationChange}
            onSelect={this.handleLocationSelect}
            suggestions={suggestions}
          />
        ) : (
          <Select
            value={value ? options.find(option => option.value === value) : defaultValue}
            onChange={this.handleChange}
            options={options}
            isDisabled={disabled}
            placeholder={placeholder}
            className={'select' + (error ? ' invalid' : '')}
            isClearable={!required}
          />
        )}
      </FormGroup>
    )
  }

  handleChange = ({ value }) => {
    const { onChange } = this.props
    onChange(value)
  }

  handleLocationChange = address => {
    const { onChange } = this.props
    onChange(address)
  }

  handleLocationSelect = address => {
    const { onChange } = this.props

    geocodeByAddress(address)
      .then(results => {
        const result = results[0]
        const address = result.formatted_address

        getLatLng(result)
          .then(latLng => {
            const location = {
              ...determinePosition({ address, latLng }),
              name: address
            }
            onChange(location)
          })
          .catch(error => {
            console.log('Error getting latLng from address:', error)
          })
      })
  }
}

export default connectField(Select_)