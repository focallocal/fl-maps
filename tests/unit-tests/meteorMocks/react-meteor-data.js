import React, { Component } from 'react'

const withTracker = (func) => {

  return (WrappedComponent) => (
    class WrappingComponents extends Component {

      render () {
        return <WrappedComponent {...func()} {...this.props} />
      }
    }
  )
}


export {
  withTracker
}
