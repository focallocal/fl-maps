import React from 'react'
import { NumField } from 'uniforms-bootstrap5'
import { FormGroup, Label, Input } from 'reactstrap'

const NumberField = ({
  id,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
  max,
  min,
  customType,
  defaultValue,
  error,
  field,
  ...props
}) => {
  const handleChange = (e) => {
    const { value, type } = e.target

    // Prevent numbers lower than the minimum
    if (type === 'number' && value < min) {
      if (field.optional) {
        return onChange('')
      }
      return onChange(min)
    }

    if (type === 'number' && value > max) {
      return onChange(max)
    }

    onChange(value.substr(0, max))
  }

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        id={id}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        type={customType || 'number'}
        value={value !== undefined ? value : defaultValue}
        max={max}
        min={min}
        invalid={Boolean(error)}
      />
    </FormGroup>
  )
}

export default NumberField