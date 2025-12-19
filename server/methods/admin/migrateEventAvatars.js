// @ts-nocheck
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import Events from '/imports/both/collections/events'

/**
 * One-time migration utility for Events collection
 * Currently: Populates organiser.username on old events for avatar display
 * 
 * Other fields that could be migrated with similar logic:
 * - organiser.avatar_template (Discourse avatar URL template)
 * - organiser.name (display name vs username)
 * - categories.color / categories.slug (if category schema changes)
 * - address.city / address.country (geocoding updates)
 * - engagement.limit (if default values change)
 * 
 * To reuse: Update the $or query and the $set operation below
 */

// Meteor method for manual invocation
Meteor.methods({
  'Admin.migrateEventAvatars'() {
    // Check if user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in')
    }

    // Check if user is admin
    const user = Meteor.users.findOne(this.userId)
    const isAdmin = user && Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
    
    if (!isAdmin) {
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
