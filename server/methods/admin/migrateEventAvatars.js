// @ts-nocheck
import { Meteor } from 'meteor/meteor'
import Events from '/imports/both/collections/events'

/**
 * One-time migration to populate organiser.username on old events
 * This fixes avatar display for events created before the username field was added
 * 
 * Can be removed after running successfully
 */
export default function migrateEventAvatars () {
  Meteor.methods({
    'Admin.migrateEventAvatars': function () {
      // Check if user is admin
      const user = Meteor.users.findOne(this.userId)
      if (!user || !user.roles || !user.roles.includes('admin')) {
        throw new Meteor.Error('not-authorized', 'You must be an admin to run this migration')
      }

      console.log('Starting avatar migration...')

      // Find all events where organiser.username is missing or empty
      const eventsToMigrate = Events.find({
        $or: [
          { 'organiser.username': { $exists: false } },
          { 'organiser.username': null },
          { 'organiser.username': '' }
        ]
      }).fetch()

      console.log(`Found ${eventsToMigrate.length} events to migrate`)

      let updated = 0
      let skipped = 0
      let errors = 0

      eventsToMigrate.forEach(event => {
        try {
          // Get the organiser user ID
          const organiserId = event.organiser?._id
          if (!organiserId) {
            console.log(`Event ${event._id}: No organiser._id, skipping`)
            skipped++
            return
          }

          // Find the user to get their username
          const organiserUser = Meteor.users.findOne(organiserId)
          if (!organiserUser) {
            console.log(`Event ${event._id}: Organiser user ${organiserId} not found, skipping`)
            skipped++
            return
          }

          // Get username - prefer Discourse username
          const username = organiserUser.services?.discourse?.username || 
                          organiserUser.username ||
                          organiserUser.profile?.name

          if (!username) {
            console.log(`Event ${event._id}: No username found for user ${organiserId}, skipping`)
            skipped++
            return
          }

          // Update the event with the username
          Events.update(event._id, {
            $set: { 'organiser.username': username }
          })

          console.log(`Event ${event._id}: Updated organiser.username to "${username}"`)
          updated++
        } catch (err) {
          console.error(`Event ${event._id}: Error - ${err.message}`)
          errors++
        }
      })

      const result = {
        total: eventsToMigrate.length,
        updated,
        skipped,
        errors
      }

      console.log('Migration complete:', result)
      return result
    }
  })
}
