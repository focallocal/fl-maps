import React from 'react'
import connectField from 'uniforms/connectField'
import { FormGroup, Label, Input } from 'reactstrap'

const Number_ = ({
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
  ...props
}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>

      <Input
        id={id}
        name={name}
        onChange={e => handleChange(e, onChange, max, min)}
        placeholder={placeholder}
        type={customType || type}
        value={value !== undefined ? value : defaultValue}
        max={max}
        min={min}
        invalid={Boolean(error)}
      />
    </FormGroup>
  )
}

const handleChange = (e, onChange, max, min) => {
  const { value, type } = e.target

  // Prevent numbers lower than the minimum
  if (type === 'number' && value < min) {
    return onChange(min)
  }

  if (type === 'number' && value > max) {
    return onChange(max)
  }

  onChange(value.substr(0, max))
}

Number_.defaultProps = { type: 'number' }

export default connectField(Number_)
