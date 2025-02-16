import React, { Component } from 'react'
import { FormGroup, Label } from 'reactstrap'
import ReactDatePicker from 'react-datepicker'
import { connectField } from 'uniforms'
import moment from 'moment'
import PropTypes from 'prop-types'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.scss'

class Date_ extends Component {
  handleChange = (date, onChange) => {
    try {
      onChange(moment(date).toDate())
    } catch (err) {
      onChange(null)
    }
  }

  render () {
    const {
      id,
      label,
      onChange,
      placeholder,
      value,
      error,
      disabled
    } = this.props

    return (
      <FormGroup>
        <Label>{label}</Label>
        <ReactDatePicker
          selected={value ? moment(value).toDate() : null}
          onChange={date => this.handleChange(date, onChange)}
          placeholder={placeholder}
          className={'form-control' + (error ? ' invalid' : '')}
          disabled={disabled}
        />
      </FormGroup>
    )
  }
}

Date_.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  error: PropTypes.bool,
  disabled: PropTypes.bool
};

export default connectField(Date_)