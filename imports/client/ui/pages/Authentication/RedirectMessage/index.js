import React from 'react'
import { Alert } from 'reactstrap'

const RedirectMessage = ({ isSSO, redirect }) => {
  let msg = null

  if (isSSO) {
    msg = "You'll be redirected back to discourse after you login"
  } else if (redirect) {
    msg = 'Please login to continue'
  }

  return msg && (
    <Alert color='info' className='redirect-msg'>
      {msg}
    </Alert>
  )
}

export default RedirectMessage
