import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * @author Arty S
 * Youtube Subscribe Button Component: allows user to subscribe to focallocal channel on click.
 * works by calling the Google API to render a YT subscribe button
 * note: requires a link to google's API script to be included in the project's main.html (root) file
 */

class Subscribe extends Component {
  /**
   * Waits for component to mount before rendering a button
   */
  componentDidMount () {
    this.renderYtSubscribeButton('UCkYVBetdxHE5juw7SPMvOGg', 'default')
  }

  /**
   * Function called on component mount.
   * grabs the Google API from the window (via main.html root file)
   * renders the button inside the ytSubscribeBtn container
   *
   * @param {String} channel Youtube channel to subscribe to (provided by componentDidMount()). Can be ID or name.
   * @param {String} buttonsize size of rendered button default vs full (provided by componentDidMount())
   */
  renderYtSubscribeButton (channel, buttonsize) {
    const googleAPI = window.gapi
    const container = document.getElementById('ytSubscribeBtn')
    /**
     * Options passed to Google include the 'layout', and ONE out of 'channelid' OR 'channel' (id vs name)
     */
    const options = {
      'channelid': channel,
      'layout': buttonsize
    }
    googleAPI.ytsubscribe.render(container, options)
  }

  /**
   * Renders the ytSubscribeBtn container
   * (this in turn is passed the actual button by Google's API)
   */
  render () {
    return (
      <div id="ytSubscribeBtn"></div>
    )
  }
}

export default Subscribe
