import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { HTTP } from 'meteor/http'
import { logRateLimit } from '/server/security/rate-limiter'

const name = 'General.getUserLocation'
const getUserLocation = new ValidatedMethod({
  name,
  mixins: [],
  validate: null,
  run () {
    const { ipstack_api_key: key } = Meteor.settings.private

    let ip
    try {
      if (Meteor.isDevelopment) {
        ip = HTTP.get('https://jsonip.com/').data.ip
      } else {
        ip = this.connection.clientAddress
      }
    } catch (ex) {}

    try {
      const location = HTTP.get('http://api.ipstack.com/' + ip + '?access_key=' + key).data
      const lngLat = {
        lng: location.longitude,
        lat: location.latitude
      }

      return lngLat
    } catch (ex) {
      return new Meteor.Error('General.getUserLocation', ex)
    }
  }
})

DDPRateLimiter.addRule({
  name,
  type: 'method'
}, 1, 60000, ({ allowed }, { userId, clientAddress }) => { // 1 request every 60 seconds
  if (!allowed) {
    logRateLimit(name, userId, clientAddress)
  }
})
