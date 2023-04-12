import React from 'react'
import connectField from 'uniforms/connectField'
import { Alert } from 'reactstrap'

const Error = ({ error, errorMessage, children, customMessage }) =>
  !error ? null : (
    <Alert color='danger' className='error-message'>
      {children || (customMessage || errorMessage)}
    </Alert>
  )

export default connectField(Error, { initialValue: false })
