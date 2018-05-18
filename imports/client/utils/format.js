
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

export function formatReactSelectOptions (options = [], labelKey) {
  /*
    React-select expects an array of objects with the following format -> { value: '', label: '' }
    So we must ensure our array of options always match that format.

    # If labelKey is undefined
      the options array we provide consist of primitive types.

    # We save the index of the option as the value so we can later retrieve it easily
      (react-select doesn't allow objects as values)
  */

  let options_ = options
  if (!options.reduce) {
    options_ = [options]
  }

  return options_.reduce(function (arr, option, index) {
    return arr.concat({
      value: index,
      label: labelKey ? option[labelKey] : option
    })
  }, [])
}

export function formatDate (date) {
  if (!date) {
    throw new Error('please provide a valid date')
  }

  return new Date(date).toISOString().substring(0, 10).split('-').join('/')
}
