const crypto = require('crypto')

export function getGravatar (user, size) {
  let hash = crypto.createHash('md5').update(user).digest("hex")
  return 'https://s.gravatar.com/avatar/' + hash + '?s=' + size
}

export function isSpecialCategorySelected (categories) {
   return categories.some(e => {
     return e.name === 'Community Offer' || e.name === 'Meet me for Action!'
   })
}
