import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import App from '/imports/client'

import '/imports/client/stylesheets/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faCaretDown, faBars, faHome, faCircleInfo, 
  faShoppingCart, faWalking, faSun, faStar, faTimes, faLocationArrow} from '@fortawesome/free-solid-svg-icons'

Meteor.startup(() => {
  ensureSettingsFile()
  determineMapType()
  // Note: Google Maps is loaded by withScriptjs in the Map component
  // Do NOT load it here to avoid "Element already defined" errors

  Meteor.subscribe('users.user') // subscribe to updated publication with custom fields

  library.add(faUserCircle, faCaretDown, faBars, faHome, faCircleInfo, 
    faShoppingCart, faWalking, faSun, faStar, faTimes, faLocationArrow)

  // <div id='root' style='opacity: 0;'></div>
  const rootDiv = document.createElement('div')
  rootDiv.id = 'root'
  rootDiv.style.opacity = 0
  document.body.appendChild(rootDiv)

  ReactDOM.render(<App />, document.getElementById('root'))
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

window.__setDocumentTitle = function (page) {
  const mapTypeTitle = window.__mapType === 'gatherings' ? 'Focallocal' : 'BrighterTomorrowMap'
  document.title = page + ' - ' + mapTypeTitle
}
