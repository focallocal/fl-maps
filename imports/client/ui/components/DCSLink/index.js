import React, { Component, Fragment } from 'react'
import { withDcs } from 'dcs-react-router-sync'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

//------------------------------------------------------------------------------

let g_init = false

function initDeselectHandler(history) {
  if (g_init) {
    return
  }

  // Handle mouse clicks to deselect any Docuss trigger
  window.addEventListener('click', ({ target }) => {
    const url = new URL(location.href)
    if (
      url.searchParams.get('dcs-trigger-id') &&
      !target.closest('.dcs-link-icons')
    ) {
      url.searchParams.delete('dcs-layout')
      url.searchParams.delete('dcs-interact-mode')
      url.searchParams.delete('dcs-trigger-id')
      const path = url.pathname + url.search
      history.push(path)
    }
  })

  g_init = true
}

//------------------------------------------------------------------------------

class DCSLink extends Component {
  constructor(props) {
    super(props)
    const { history } = this.props
    initDeselectHandler(history)
  }

  render() {
    const { title, triggerId, dcsSelected, dcsCount, history, format, badge } = this.props

    const url = new URL(location.href)
    url.searchParams.set('dcs-layout', 3)
    url.searchParams.set('dcs-interact-mode', 'DISCUSS')
    url.searchParams.set('dcs-trigger-id', triggerId)
    const path = url.pathname + url.search

    let renderBadge = (
      <span
        className="dcs-badge"
        title={`This section has ${dcsCount} topic(s)`}
      >
        {dcsCount}
      </span>
    )

    console.log(
      title, ' has topic count ', dcsCount
    )

    if (format === 'speech-bubble') return (
      <span className={'dcs-link' + (dcsSelected ? ' dcs-selected' : '')}>
        <span className="dcs-link-title">{title}</span>
        <span className="dcs-link-icons" onClick={() => history.push(path)}>
          <img src={`/images/dcs-balloon-bal.png`} />
          {dcsCount > 0 && badge === 'true' && renderBadge}
        </span>
      </span>
    )

    else if (format === 'text-link') return (
      <span
        onClick={() => history.push(path)}
        className={'dcs-link dcs-link-icons' + (dcsSelected ? ' dcs-selected' : '')}
      >
        <span className="dcs-link-title text-title">{title}</span>
        {/* {' '}<img src={`/images/dcs-balloon-bal.png`} /> */}
        {dcsCount > 0 && badge === 'true' && renderBadge}
      </span>
    )
  }
}

export default withRouter(withDcs(DCSLink))

DCSLink.propTypes = {
  title: PropTypes.string,
  triggerId: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired
}
