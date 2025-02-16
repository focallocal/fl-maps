import React from 'react'
import { AutoField } from 'uniforms-bootstrap5'
import { connectField } from 'uniforms-bootstrap5'
import { bridge } from '/imports/both/collections/events/index'

import DateField from './DateField'
import InputField from './InputField'
import NumberField from './NumberField'
import SelectField from './SelectField'

const Auto = props => {
  const { component, customType, fieldType } = props

  if (customType) {
    switch (customType) {
      case 'select': return <SelectField {...props} />
      case 'textarea': return <InputField {...props} />
      case 'number': return <InputField {...props} />
      default: return <InputField {...props} />
    }
  }

  if (component) {
    return React.createElement(component, props)
  }

  switch (fieldType) {
    case Date: return <DateField {...props} />
    case String: return <InputField {...props} />
    case Number: return <NumberField {...props} />
    default: return <InputField {...props} />
  }
}

export default connectField(Auto)