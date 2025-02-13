import { BaseField } from 'uniforms'
import React from 'react'
import { filterDOMProps } from 'uniforms'
import { nothing } from 'uniforms'

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