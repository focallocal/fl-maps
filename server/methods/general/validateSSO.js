import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { logRateLimit } from '/server/security/rate-limiter'
import querystring from 'query-string'
import crypto from 'crypto'

const name = 'General.validateSSO'
export const validateSSO = new ValidatedMethod({
  name,
  mixins: [],
  validate: null,
  run (data) {
    const {
      sso: payload,
      sig
    } = data

    const { discourse_sso_key } = Meteor.settings.private

    if (!discourse_sso_key) {
      throw Error('No Discourse key found in settings')
    }

    const sso = new DiscourseSSO(discourse_sso_key)

    if (sso.validate(payload, sig)) {
      const user = Meteor.user()
      const email = findMail(user)

      return sso.buildLoginString({
        nonce: sso.getNonce(payload),
        'external_id': user._id,
        'email': email.address,
        'require_activation': !email.verified
      })
    }

    throw new Meteor.Error('General.validateSSO', 'Could not process this request')
  }
})

export function findMail (user) {
  if (user.emails) {
    return {
      address: user.emails[0].address,
      verified: user.emails[0].verified
    }
  }

  const s = user.services

  if (s.google) {
    return {
      address: s.google.email,
      verified: true
    }
  }

  if (s.facebook) {
    return {
      address: s.facebook.email,
      verified: true
    }
  }
}

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 2, 10000, ({ allowed }, { userId, clientAddress }) => { // 2 requests every 10 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})

// was taken from https://github.com/antofa/DiscourseSSO_node

class DiscourseSSO {
  constructor (secret) {
    this.sso_secret = secret
  }

  getHmac () {
    return crypto.createHmac('sha256', this.sso_secret)
  }

  validate (payload, sig) {
    var hmac = this.getHmac()
    hmac.update(payload)
    if (hmac.digest('hex') === sig) {
      return true
    } else {
      return false
    }
  }

  getNonce (payload) {
    var q = querystring.parse(
      Buffer.from(payload, 'base64').toString()
    )
    if ('nonce' in q) {
      return q['nonce']
    } else {
      throw new Meteor.Error('Missing Nonce in payload!')
    }
  }

  getReturnUrl (payload) {
    var q = querystring.parse(
      Buffer.from(payload, 'base64').toString()
    )
    if ('return_sso_url' in q) {
      return q['return_sso_url']
    } else {
      throw new Meteor.Error('Missing return_sso_url in payload!')
    }
  }

  buildLoginString (params) {
    if (!('external_id' in params)) {
      throw new Meteor.Error("Missing required parameter 'external_id'")
    }
    if (!('nonce' in params)) {
      throw new Meteor.Error("Missing required parameter 'nonce'")
    }
    if (!('email' in params)) {
      throw new Meteor.Error("Missing required parameter 'email'")
    }

    var payload = Buffer.from(querystring.stringify(params), 'utf8').toString('base64')
    var hmac = this.getHmac()
    hmac.update(payload)

    return querystring.stringify({
      'sso': payload,
      'sig': hmac.digest('hex')
    })
  }
}
