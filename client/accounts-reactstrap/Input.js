import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

const InputField = (fieldObj) => {
  const {
    _id,
    displayName,
    type,
    onChange,
    placeholder,
    required, // By default is true, if equals false than ignore
    icon,
    focusInput,
    error,
    defaults
  } = fieldObj

  return (
    <FormGroup>

      {defaults.showLabels && <Label for={_id}>{displayName}</Label>}

      <Input
        id={_id}
        invalid={Boolean(error)}
        placeholder={defaults.showPlaceholders ? placeholder : ''}
        type={type}
        onChange={(e) => onChange(e, _id)}
        onBlur={(e) => onChange(e, _id)}
      />

      {error && <FormFeedback>{error.errStr}</FormFeedback>}

    </FormGroup>
  )
}

export default InputField
