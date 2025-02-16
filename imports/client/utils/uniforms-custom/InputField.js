import React from 'react'
import { connectField } from 'uniforms'
import { FormGroup, Label, Input } from 'reactstrap'

const Text = ({
  className,
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
  error,
  ...props
}) =>
  <FormGroup className={className}>
    <Label>{label}</Label>

    <Input
      id={id}
      name={name}
      onChange={e => handleChange(e, onChange, max, min)}
      placeholder={placeholder}
      type={customType || type}
      value={value}
      max={max}
      min={min}
      invalid={Boolean(error)}
    />
    {max && <div className='characters-left'>{`${max - value.length} characters left`}</div>}
  </FormGroup>

const handleChange = (e, onChange, max, min) => {
  const { value, type } = e.target

  // Prevent numbers lower than the minimum
  if (type === 'number' && value < min) {
    return
  }

  onChange(value.substr(0, max))
}

Text.defaultProps = { type: 'text' }

export default connectField(Text)