import React from 'react'
import { Alert } from 'reactstrap'

const Errors = ({ errors }) => {
  if (errors.length > 0) {
    return (
      <Alert color='danger'>
        {errors.map((err, i) => (
          <b key={i}>{err.errStr}</b>
        ))}
      </Alert>
    )
  }

  return null
}

export default Errors
