import BrighterTomorrowContent from './btm'
import PublicHappinessMovementContent from './phm'
import ClimateContent from './climate'
import WigglesContent from './wiggles'
import { Meteor } from 'meteor/meteor'

const { mapType } = Meteor.settings.public
console.log(mapType)
let content

if (mapType === 'gatherings') content = PublicHappinessMovementContent
else if (mapType === 'btm') content = BrighterTomorrowContent
else if (mapType === 'climate') content = ClimateContent
else if (mapType === 'wiggles') content = WigglesContent
else content = PublicHappinessMovementContent // Fallback to PHM

export default content
