import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { HTTP } from 'meteor/http'

const getUserLocation = new ValidatedMethod({
  name: 'General.getUserLocation',
  mixins: [],
  validate: null,
  run () {
    const { ipstack: api_key } = Meteor.settings.private

    let ip
    try {
      if (Meteor.isDevelopment) {
        ip = HTTP.get('https://jsonip.com/').data.ip
      } else {
        ip = this.connection.clientAddress
      }
    } catch (ex) {}

    try {
      const location = HTTP.get('http://api.ipstack.com/' + ip + '?access_key=' + api_key).data
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
  name: 'General.getUserLocation',
  type: 'method'
}, 1, Meteor.isDevelopment ? 1000 : 10000, () => {
  DDPRateLimiter.setErrorMessage(() => {
    return `Please wait at least 10 seconds between requests`
  })
})
