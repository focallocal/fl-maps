import React, { Component } from 'react';

class Subscribe extends Component {

  componentDidMount() {
    this.renderYtSubscribeButton('Focallocal', 'default')
  }

  renderYtSubscribeButton (channel, buttonsize) {
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