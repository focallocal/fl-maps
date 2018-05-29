
class ValidatedMethod {
  constructor (options) {
    this.name = options.name
    this.mixins = options.mixins
    this.validate = options.validate
    this.run = options.run
  }
}

export {
  ValidatedMethod
}
