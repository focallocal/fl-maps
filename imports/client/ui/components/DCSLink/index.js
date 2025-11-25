import React, { Component, Fragment } from 'react'
import { withDcs } from 'dcs-react-router-sync'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import './style.scss'

// ------------------------------------------------------------------------------

let g_init = false

function initDeselectHandler (history) {
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

// ------------------------------------------------------------------------------

class DCSLink extends Component {
  constructor (props) {
    super(props)
    const { history } = this.props
    initDeselectHandler(history)
  }

  handleClick = (e) => {
    // Prevent event from bubbling to parent Button or other handlers
    if (e) {
      // stopPropagation is intentionally omitted so parent buttons remain clickable
      e.preventDefault()
    }
    
    const { triggerId, dcsSelected, history, composerTemplate } = this.props
    console.log('🔘 DCSLink clicked:', { triggerId, dcsSelected, composerTemplate })
    
    const url = new URL(location.href)
    
    // If already selected, close the slider by removing params
    if (dcsSelected) {
      url.searchParams.delete('dcs-layout')
      url.searchParams.delete('dcs-interact-mode')
      url.searchParams.delete('dcs-trigger-id')
      url.searchParams.delete('composer_template')
    } else {
      // Otherwise, open the slider with this trigger
      url.searchParams.set('dcs-layout', 3)
      url.searchParams.set('dcs-interact-mode', 'DISCUSS')
      url.searchParams.set('dcs-trigger-id', triggerId)
      
      // Send composer template via postMessage to parent window
      if (composerTemplate && window.parent !== window) {
        try {
          window.parent.postMessage({
            type: 'dcs-composer-template',
            template: composerTemplate,
            triggerId: triggerId
          }, '*')
        } catch (error) {
          console.warn('Failed to send composer template to parent:', error)
        }
      }
    }
    
    const path = url.pathname + url.search
    history.push(path)
  }

  render () {
    const { title, triggerId, dcsSelected, dcsCount, history, format, badge, className } = this.props

    let renderBadge = (
      <span
        className="dcs-badge"
        title={`This section has ${dcsCount} topic(s)`}
      >
        {dcsCount}
      </span>
    )

    // console.log(
    //   title, ' has topic count ', dcsCount
    // )

    if (format === 'speech-bubble') {
      return (
        <span 
          className={className + ' dcs-link' + (dcsSelected ? ' dcs-selected' : '')}
          onClick={this.handleClick}
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <span className="dcs-link-title">{title}</span>
          <span className="dcs-link-icons">
            <img src={`/images/dcs-balloon-bal.png`} />
            {dcsCount > 0 && badge === 'true' && renderBadge}
          </span>
        </span>
      )
    } else if (format === 'text-link') {
      return (
        <span
          onClick={this.handleClick}
          className={className + ' dcs-link dcs-link-icons' + (dcsSelected ? ' dcs-selected' : '')}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <span className="dcs-link-title text-title">{title}</span>
          {/* {' '}<img src={`/images/dcs-balloon-bal.png`} /> */}
          {dcsCount > 0 && badge === 'true' && renderBadge}
        </span>
      )
    }
  }
}

// old:
// export default withRouter(withDcs(DCSLink))

const BaseComponent = withRouter(withDcs(DCSLink))

export default class ExtendedComponent extends React.Component {
  render () {
    return (
      <BaseComponent {...this.props} dcsScrollIntoView={dcsScrollIntoView} />
    )
  }
}

// enables scrolling to have DCS balloon at bottom of screen (instead of top) so that preceeding content is on-screen
function dcsScrollIntoView (node, route) {
  // https://stackoverflow.com/a/22480938/3567351
  const rect = node.getBoundingClientRect()
  const partiallyVisible = rect.top < window.innerHeight && rect.bottom >= 0
  if (!partiallyVisible) {
    node.scrollIntoView({ block: 'end', inline: 'nearest' })
  }
}

DCSLink.propTypes = {
  badge: PropTypes.string,
  title: PropTypes.string,
  triggerId: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  composerTemplate: PropTypes.string
}
