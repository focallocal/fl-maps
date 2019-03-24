import React, { Component, Fragment } from 'react'
import qs from 'query-string'
import history from "../../../utils/history";
import { dcs } from "../../../utils/dcs-master";


/*********************/
/*
  Render Docuss Balloon that redirects to dedicated forum page
*/
/*********************/

class DCSBalloon extends Component {
  
  constructor(props) {
    super()
    this.state = {
      selBalloonId: null,
      badges: null
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
    // Add badges (color circles with topic count)
    if (!this.state.badges && this.props.dcsTags) {
      const prefix = `dcs-${this.state.id.substring(0, 12).toLowerCase()}-`
      const badges = {}
      this.props.dcsTags.forEach(tag => {
        if (tag.id.startsWith(prefix)) {
          const balloonId = tag.id.substring(17)
          badges[balloonId] = tag.count
        }
      })
      this.setState({ badges })
    }
  }
    
  render() {

    const {
      title,
      subtitle,
      balloonId,
      display
    } = this.props

    const badgeCount = (this.state.badges && this.state.badges[balloonId]) || 0
    const badgeHtml = (
      <span
        className="dcs-badge"
        title={`This section has ${badgeCount} topic(s)`}
      >
        {badgeCount}
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
          <img src={`/images/dcs-balloon-${balloonId}.png`} />
        </span>
        {badgeCount ? badgeHtml : ''}
        <div>
          <small style={{ marginLeft: '5px', marginRight: '5px', fontSize: '60%' }}>
            {subtitle}
          </small>
        </div>
      </div>
    )
  }
}

export default DCSBalloon

// NOTE: BELOW IS COPIED DIRECTLY FROM APP.JS (function named dcsClick) - NEED TO REFACTOR TO PREVENT DUPLICATION

function dcsClickApp(balloonId) {
  if (balloonId) {
    if (balloonId.length > 3 || balloonId.toLowerCase() !== balloonId) {
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