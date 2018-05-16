
export function formatCategories (categories) {
  /*
    Format array of categories into a sentence
  */

  return categories.reduce((str, category, index) => {
    str += `${category.name}, `

    if (!categories[index + 1]) {
      str = str.substr(0, str.length - 2)
    }

    return str
  }, '')
}

export function formatDate (date) {
  return new Date(date).toISOString().substring(0, 10).split('-').join('/')
}
