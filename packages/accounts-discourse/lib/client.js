import { Accounts } from 'meteor/accounts-base'
import { ServiceConfiguration } from 'meteor/service-configuration'
import { Tracker } from 'meteor/tracker'

//------------------------------------------------------------------------------

// Get the sso query params
const parsedUrl = new URL(location.href)
const sso = parsedUrl.searchParams.get('sso')
const sig = parsedUrl.searchParams.get('sig')

if (sso && sig) {
  // Login
  Accounts.callLoginMethod({
    methodArguments: [{ discourse: true, sso, sig }],
    userCallback: err => {
      if (err) {
        throw err
      }
    }
  })

  // Remove sso query params from the address bar
  parsedUrl.searchParams.delete('sso')
  parsedUrl.searchParams.delete('sig')
  history.replaceState(null, null, parsedUrl.href)
}

//------------------------------------------------------------------------------

const oneTimeLogin = new Promise(resolve => {
  Tracker.autorun(computation => {
    if (Accounts.loginServicesConfigured()) {
      computation.stop()
      const discourseService = ServiceConfiguration.configurations.findOne({
        service: 'discourse'
      })
      resolve(discourseService && discourseService.oneTimeLogin)
    }
  })
})

Accounts.onLogin(data => {
  if (data.type === 'discourse') {
    oneTimeLogin.then(oneTime => {
      if (oneTime) {
        // See https://forums.meteor.com/t/how-to-implement-one-time-login/27834/3?u=sylvain
        Accounts._unstoreLoginToken()
        Accounts._autoLoginEnabled = false
      }
    })
  }
})

//------------------------------------------------------------------------------
