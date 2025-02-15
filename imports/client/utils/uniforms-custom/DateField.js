import React, { Component } from 'react'
import { FormGroup, Label } from 'reactstrap'
import ReactDatePicker from 'react-datepicker'
import { connectField } from 'uniforms'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.scss'

class Date_ extends Component {
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
          onChange={date => handleChange(date, onChange)}
          placeholder={placeholder}
          className={'form-control' + (error ? ' invalid' : '')}
          disabled={disabled}
        />
      </FormGroup>
    )
  }
}

const handleChange = (date, onChange) => {
  try {
    onChange(moment(date).toDate())
  } catch (err) {
    onChange(null)
  }
}

export default connectField(Date_)