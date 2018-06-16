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

  AccountsReact.style(AccountsReactstrap)

  Meteor.subscribe('users.user') // subscribe to updated publication with custom fields

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
  const { mapType } = Meteor.settings.public
  if (!mapType) {
    throw new Error("You've probably forgot to add a mapType field to settings.json file")
  }
  window.__mapType = mapType
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

window.__setDocumentTitle = function (page) {
  const mapTypeTitle = window.__mapType === 'gatherings' ? 'Focallocal' : 'BrighterTomorrowMap'
  document.title = page + ' - ' + mapTypeTitle
}
