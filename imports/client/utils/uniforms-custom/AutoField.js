import React from 'react'
import { AutoField } from 'uniforms'
import { connectField } from 'uniforms'

import DateField from './DateField'
import InputField from './InputField'
import NumberField from './NumberField'
import SelectField from './SelectField'

class Auto extends AutoField {
  getChildComponent() {
    const { component, customType, fieldType } = this.props

    if (customType) {
      switch (customType) {
        case 'select': return SelectField
        case 'textarea': return InputField
        case 'number': return InputField
        default: return InputField
      }
    }

    if (component) {
      return component
    }

    switch (fieldType) {
      case Date: return DateField
      case String: return InputField
      case Number: return NumberField
      default: return InputField
    }
  }

  render() {
    const Component = this.getChildComponent()
    return <Component {...this.props} />
  }
}

export default connectField(Auto)