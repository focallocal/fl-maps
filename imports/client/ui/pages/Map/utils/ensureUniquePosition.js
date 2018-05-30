/*
  This algorithm ensures that no same location markers are hiding each other.
  We cache everything to avoid unnecessary calculations for over re-renders.
  Go through the code slowly, it should be fairly self-explantory.
*/

import haversineOffset from 'haversine-offset'

export default function ensureUniquePosition (cache, event, markers) {
  const { coordinates } = event.address.location // get coordinates
  const lng = coordinates[0]
  const lat = coordinates[1]
  const cachedString = `${lng}${lat}` // generate a string for the given coordinates so we can look it up quickly later

  let cachedSet = cache[cachedString] // returns undefined or a Set with events id's
  let cachedPosition = cache[event._id] // returns undefined or an already calculated position

  if (cachedPosition) { return cachedPosition } // already calculated.

  if (cachedSet) {
    if (!cachedSet.has(event._id)) {
      cachedSet.add(event._id)
    }

    if (cachedPosition) {
      return cachedPosition
    } else {
      // A simple not-mathematical based algorithm to prevent overlap between same-location markers

      const index = [...cachedSet].findIndex(id => id === event._id)
      const offset = {
        x: Math.random() * (index % 2 === 0 ? 1.3 : -1.3),
        y: Math.random() * (index % 2 === 0 ? 1.3 : -1.3)
      }

      cache[event._id] = {
        latLng: haversineOffset({ lat, lng }, offset),
        overlapping: true
      }

      return cache[event._id]
    }
  } else {
    cache[cachedString] = new Set()
    cache[cachedString].add(event._id) // set marker in cache
    cache[event._id] = {
      latLng: {
        lng,
        lat
      }
    }

    return cache[event._id]
  }
}
