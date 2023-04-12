import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
  componentDidUpdate (prevProps) {
    // Compare only path names, as we don't want to scroll to top when only
    // query params have changed. ALso, don't scroll when there's a Docuss
    // triggerId, as we will scroll to that trigger.
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      !this.props.location.search.includes('dcs-trigger-id')
    ) {
      window.scrollTo(0, 0)
    }
  }

  render () {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
