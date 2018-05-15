import React from 'react'
import ReactDOM from 'react-dom'
import { AccountsReact } from 'meteor/meteoreact:accounts'
import * as AccountsReactstrap from './accounts-reactstrap'
import App from '/imports/client'

import '/imports/client/stylesheets/main.scss'

Meteor.startup(() => {
  if (!Meteor.settings.public.gm) {
    throw new Error("You've probably forgot to start meteor with 'npm run start'")
  }
  AccountsReact.style(AccountsReactstrap)

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})
