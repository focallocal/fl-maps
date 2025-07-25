const crypto = require('crypto')

export function getGravatar (user, size) {
  let hash = crypto.createHash('md5').update(user).digest('hex')
  return 'https://s.gravatar.com/avatar/' + hash + '?s=' + size
}

export function isSpecialCategorySelected (categories) {
  if (Array.isArray(categories)) {
    return categories.some(e => {
    return e.name === 'Community Offer' || e.name === 'Meet me for Action!'
  })
  } else if (categories && typeof categories === 'object') {
    return categories.name;
  } else {
    return '';
  }
}
