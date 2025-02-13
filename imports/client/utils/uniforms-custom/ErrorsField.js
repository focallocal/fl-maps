import { BaseField } from 'uniforms'
import React from 'react'
import filterDOMProps from 'uniforms/filterDOMProps'
import nothing from 'uniforms/nothing'

const ErrorsField = ({children, ...props}, {uniforms: {error, schema}}) =>
  (!error && !children) ? nothing : (
    <div {...filterDOMProps(props)}>
      {children}

      <ul>
        {schema.getErrorMessages(error).map((message, index) =>
          <li key={index}>
            {message}
          </li>
        )}
      </ul>
    </div>
  )

ErrorsField.contextTypes = BaseField.contextTypes

export default ErrorsField