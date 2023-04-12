import BrighterTomorrowContent from './btm'
import PublicHappinessMovementContent from './phm'
import { Meteor } from 'meteor/meteor'

const { mapType } = Meteor.settings.public
console.log(mapType)
let content

if (mapType === 'gatherings') content = PublicHappinessMovementContent
else if (mapType === 'btm') content = BrighterTomorrowContent
else throw new Error('Unknown mapType provided in settings: unable to export the appropriate content')

export default content
