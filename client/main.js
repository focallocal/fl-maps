import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { AccountsReact } from 'meteor/meteoreact:accounts'
import * as AccountsReactstrap from './accounts-reactstrap'
import App from '/imports/client'

import '/imports/client/stylesheets/main.scss'

Meteor.startup(() => {
  const { gm } = Meteor.settings.public
  if (!gm) {
    throw new Error("You've probably forgot to start meteor with 'npm run start'")
  }
  AccountsReact.style(AccountsReactstrap)

  setTimeout(() => {
    if (!window.google) {
      const url = 'https://maps.googleapis.com/maps/api/js?key=' + gm.key + '&v=3.exp&libraries=places'
      let script = document.createElement('script')
      script.src = url
      script.defer = true

      document.head.appendChild(script)
    }
  }, 3000)

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})
