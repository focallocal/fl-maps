import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { AccountsReact } from 'meteor/meteoreact:accounts'
import * as AccountsReactstrap from './accounts-reactstrap'
import App from '/imports/client'

import '/imports/client/stylesheets/main.scss'

Meteor.startup(() => {
  ensureSettingsFile()
  determineMapType()
  loadGoogleMaps()
  loadFacebook()

  AccountsReact.style(AccountsReactstrap)

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})

function ensureSettingsFile () {
  const { gm } = Meteor.settings.public
  if (!gm) {
    throw new Error("You've probably forgot to start meteor with 'npm run start'")
  }
}

function determineMapType () {
  window.__mapType = 'brightersidetomorrow'
}

function loadGoogleMaps () {
  const { key } = Meteor.settings.public.gm

  setTimeout(() => {
    if (!window.google) {
      const url = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&v=3.exp&libraries=places'
      let script = document.createElement('script')
      script.src = url
      script.defer = true

      document.head.appendChild(script)
    }
  }, 1500)
}

function loadFacebook () {
  if (!window.FB) {
    let ele = document.createElement('script')
    ele.setAttribute('id', 'facebook-jssdk')
    ele.src = '//connect.facebook.net/en_US/sdk.js'
    ele.async = true
    document.body.appendChild(ele)

    window.fbAsyncInit = function () {
      const appId = '196447867795092'
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.9'
      })
    }
  }
}
