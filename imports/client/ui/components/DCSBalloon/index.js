import React, { Component, Fragment } from 'react'
//import qs from 'query-string'
//import history from '../../../utils/history'
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
      !target.closest('.dcs-balloon-icons')
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

class DCSBalloon extends Component {
  constructor(props) {
    super(props)
    const { history } = this.props
    initDeselectHandler(history)
  }

  render() {
    const { title, triggerId, dcsSelected, dcsCount, history } = this.props

    const url = new URL(location.href)
    url.searchParams.set('dcs-layout', 3)
    url.searchParams.set('dcs-interact-mode', 'DISCUSS')
    url.searchParams.set('dcs-trigger-id', triggerId)
    const path = url.pathname + url.search

    let badge = ''
    if (dcsCount) {
      badge = (
        <span
          className="dcs-badge"
          title={`This section has ${dcsCount} topic(s)`}
        >
          {dcsCount}
        </span>
      )
    }

    return (
      <span className={'dcs-balloon' + (dcsSelected ? ' dcs-selected' : '')}>
        <span className="dcs-balloon-title">{title}</span>
        <span className="dcs-balloon-icons" onClick={() => history.push(path)}>
          <img src={`/images/dcs-balloon-bal.png`} />
          {badge}
        </span>
      </span>
    )
  }
}
export default withRouter(withDcs(DCSBalloon))

DCSBalloon.propTypes = {
  title: PropTypes.string.isRequired,
  triggerId: PropTypes.string.isRequired
}

//------------------------------------------------------------------------------

/**
 * BELOW: Legacy DCS plugins and features, currently disconnected
 */

// import { dcs } from "../../../utils/dcs-master"

/*********************/
/*
  Render Docuss Balloon that redirects to dedicated forum page
*/
/*********************/

/*

class DCSBalloon extends Component {
  
  constructor(props) {
    super()
    this.state = {
      selBalloonId: null,
      topicCount: null
    }
  }
  
  dcsClick(balloonId, e) {
    dcsClickApp(balloonId)
    e.stopPropagation() // Required for deselection
  }

  componentDidUpdate(prevProps, prevState) {
    // DOCUSS
    // Update selBalloonId here, so that we catch url changes triggered
    // in other components
    const { b } = qs.parse(window.location.search)
    if (this.state.selBalloonId !== b) {
      this.setState({ selBalloonId: b })
    }

    // DOCUSS
    // Add topic count to component state
    if (prevProps.dcsTags !== this.props.dcsTags) {
      const pathname = window.location.pathname
      const endIndex = pathname.search('\\?') > -1 ? pathname.search('\\?') : pathname.length
      const tagLocation = pathname.slice(pathname.search('/') + 1, endIndex)
      const tagName = `dcs-${tagLocation}-${this.props.balloonId}`
      const tag = this.props.dcsTags.find(tag => tag.id === tagName)
      const count = tag? tag.count : 0
      this.setState({ topicCount: count })
    }
  }
    
  render() {
    const {
      title,
      subtitle,
      balloonId,
      display
    } = this.props

    const topicCount = this.state.topicCount || 0
    const badgeHtml = (
      <span
        className="dcs-badge"
        title={`This section has ${topicCount} topic(s)`}
      >
        {topicCount}
      </span>
    )

    const titleClass =
      balloonId === this.state.selBalloonId ? 'dcs-selected' : ''

    return (
      <div
        style={{ margin: '20px 0', cursor: 'pointer', display: display, padding: '0px 10px' }}
        onClick={e => this.dcsClick(balloonId, e)}
      >
        <b className={titleClass}>{title}</b>&nbsp;

          <span className="dcs-icons">
          <img src={`/images/dcs-balloon-${balloonId.replace(/[0-9]/g, '')}.png`} />
        </span>
        {topicCount ? badgeHtml : ''}
        <div>
          <small style={{ marginLeft: '5px', marginRight: '5px', fontSize: '60%' }}>
            {subtitle}
          </small>
        </div>
      </div>
    )
  }
}

// export default DCSBalloon
export default {}

// NOTE: BELOW IS COPIED DIRECTLY FROM APP.JS (function named dcsClick) - NEED TO REFACTOR TO PREVENT DUPLICATION

function dcsClickApp(balloonId) {
  if (balloonId) {
    if (balloonId.replace(/[0-9]/g, '').length > 3 || balloonId.toLowerCase() !== balloonId) {
      throw new Error(`Invalid balloonId "${balloonId}"`);
    }
    changeHistory({
      params: { r: "1", b: balloonId, t: null, d: null },
      push: true
    });
  } else {
    changeHistory({
      params: { r: null, b: null, t: null, d: null },
      push: true
    });
  }
}

// NOTE: BELOW IS COPIED DIRECTLY FROM APP.JS - NEED TO REFACTOR TO PREVENT DUPLICATION

// A falsy pathname means the pathname won't be changed
// An undefined query params means the query param won't be changed
// A null query params means the query param will be removed
function changeHistory({ pathname = null, params, push }) {
  const p = Object.assign(params);
  Object.keys(p).forEach(key => p[key] === undefined && delete p[key]);
  const s = qs.parse(window.location.search);
  Object.assign(s, p);
  Object.keys(s).forEach(key => s[key] === null && delete s[key]);
  const search = qs.stringify(s);
  //############################################################################
  // TERRIBLE WORKAROUND FOR ISSUE https://github.com/focallocal/fl-maps/issues/742
  if (pathname && pathname !== location.pathname) {
    console.log("##########", pathname + "?" + search);
    location.href = pathname + "?" + search;
    return;
  }
  //############################################################################
  pathname = pathname || window.location.pathname;
  if (push) {
    history.push({ pathname, search });
  } else {
    history.replace({ pathname, search });
  }
}

*/
