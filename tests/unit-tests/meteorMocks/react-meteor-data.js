import React, { Component } from 'react'

const withTracker = (options) => {
  let options_ = options
  if (typeof options === 'function') {
    options_ = options()
  }

  return (WrappedComponent) => (
    class WrappingComponents extends Component {
      render () {
        return <WrappedComponent {...options_} />
      }
    }
  )
}

export {
  withTracker
}
