import React, { Component } from 'react';

class Subscribe extends Component {

  // NOTE: can only render subscribe button once component has loaded
  componentDidMount() {
    this.renderYtSubscribeButton('Focallocal', 'default')
  }

  renderYtSubscribeButton (channel, buttonsize) {
    // NOTE: required use of external google api script, this was included in main.html root file
    const googleAPI = window.gapi
    const container = document.getElementById('ytSubscribeBtn');
    const options = {
      'channel': channel,
      'layout': buttonsize
    };
    googleAPI.ytsubscribe.render(container, options);
  }

  render() {
    return (
      <div id="ytSubscribeBtn"></div>
    )
  }

}

export default Subscribe