const URL = require('url').URL
import crypto from 'crypto'
import { parse, stringify } from 'querystring'

import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { Accounts } from 'meteor/accounts-base'
import { ServiceConfiguration } from 'meteor/service-configuration'
import { WebApp } from 'meteor/webapp'
import { check } from 'meteor/check'

//------------------------------------------------------------------------------

const Nonces = new Mongo.Collection('discourse-sso-consumer-nonces')

//------------------------------------------------------------------------------

const SERVICE_ERROR_MSG =
  'service not found or invalid service settings. Did you properly initialize the package?'

//------------------------------------------------------------------------------

WebApp.connectHandlers.use('/', (req, res, next) => {
  const queryParams = req._parsedUrl.search
    ? parse(req._parsedUrl.search.substring(1))
    : {}

  if (req.method === 'GET' && queryParams['discourse-login']) {
    // Get the service
    const service = getService()
    if (!service) {
      const msg = 'sylque:accounts-discourse error: ' + SERVICE_ERROR_MSG
      console.log(msg)
      res.writeHead(500)
      res.end(msg)
      return
    }

    // Create and store the nonce. Delete it in 30s in case it hasn't been used
    var nonce = Random.secret()
    Nonces.insert({ _id: nonce })
    Meteor.setTimeout(() => Nonces.remove(nonce), 30000)

    // Build the return url
    // See https://github.com/michaelrhodes/full-url/blob/master/index.js
    // WARNING: In Meteor 1.6.x, Meteor.absoluteUrl() doesn't work correctly
    // if the argument begins with a '/'
    delete queryParams['discourse-login']
    const queryParamsStr = stringify(queryParams)
    const queryParamsStr2 = queryParamsStr ? '?' + queryParamsStr : ''
    const pathname = req._parsedUrl.pathname
    const fwdHost = (req.headers['x-forwarded-host'] || '').split(',')[0]
    const fwdProt = (req.headers['x-forwarded-proto'] || '').split(',')[0]
    const returnUrl =
      fwdHost && fwdProt
        ? `${fwdProt}://${fwdHost}${pathname}${queryParamsStr2}`
        : Meteor.absoluteUrl(pathname.substring(1), {
            secure: !!req.connection.encrypted
          }) + queryParamsStr2

    // Compute the sso payload
    const payload = `nonce=${nonce}&return_sso_url=${returnUrl}`
    const base64Payload = Buffer.from(payload).toString('base64')
    const uriEncodedPayload = encodeURIComponent(base64Payload)

    // Compute the payload signature
    const sig = crypto
      .createHmac('sha256', service.secret)
      .update(base64Payload)
      .digest('hex')

    // Build redirect url
    const redirectUrl = `${
      service.url
    }/session/sso_provider?sso=${uriEncodedPayload}&sig=${sig}`

    // Redirect
    res.writeHead(307, { Location: redirectUrl })
    res.end()
  } else {
    next()
  }
})

//------------------------------------------------------------------------------

Accounts.registerLoginHandler(loginRequest => {
  // Only process Discourse login requests
  if (!loginRequest.discourse) {
    return
  }

  check(loginRequest, { discourse: Boolean, sso: String, sig: String })

  // Get the service
  const service = getService()
  if (!service) {
    return errorObj(SERVICE_ERROR_MSG)
  }

  // Compute the signature
  const base64Payload = decodeURIComponent(loginRequest.sso)
  const sig = crypto
    .createHmac('sha256', service.secret)
    .update(base64Payload)
    .digest('hex')
  if (sig !== loginRequest.sig) {
    return errorObj('Signature mismatch')
  }

  // Get the payload
  const payload = parse(Buffer.from(base64Payload, 'base64').toString())

  // Check the nonce
  if (Nonces.find(payload.nonce).count() !== 1) {
    return errorObj('nonce not found')
  }
  Nonces.remove(payload.nonce)

  // Update or create the user. Notice that is only updates the "service" field
  // in user.
  return Accounts.updateOrCreateUserFromExternalService('discourse', {
    id: Number(payload.external_id),
    username: payload.username,
    name: payload.name,
    groups: payload.groups,
    email: payload.email,
    admin: payload.admin === 'true',
    moderator: payload.moderator === 'true'
  })
})

function errorObj(msg) {
  return {
    type: 'discourse',
    error: new Meteor.Error(Accounts.LoginCancelledError.numericError, msg)
  }
}

//------------------------------------------------------------------------------

function getService() {
  const service = 'discourse'
  const res = ServiceConfiguration.configurations.findOne({ service })
  if (!res || !res.secret || !res.url) {
    return null
  }
  try {
    res.url = new URL(res.url).origin
  } catch (e) {
    return null
  }
  return res
}

//------------------------------------------------------------------------------
