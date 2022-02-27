const common = require('../commonCheck')
const { validateString, stringOptions } = require('../stringCheck')

const numOptions = common.numOptions

class Fields {
  /**
   * @param { String } name 
   * @param { stringOptions } options 
   */
  addString(name, options) {
    this[name] = (value) => validateString(value, options)
  }

  /**
   * @param { String } name 
   * @param { numOptions } options 
   */
  addNumber(name, options) {
    this[name] = (value) => common.isNumber(value, options)
  }

  /**
   * @param { String } name 
   */
  addDate(name) {
    this[name] = (value) => common.isDate(value)
  }

  /**
   * @param { String } name 
   */
  addBoolean(name) {
    this[name] = (value) => common.isBoolean(value)
  }

  /**
   * @param { String } name 
   */
  addEmail(name) {
    this[name] = (value) => common.isEmail(value)
  }

  /**
   * @param { String } name 
   */
  addURL(name) {
    this[name] = (value) => common.isURL(value)
  }

  /**
   * @param { String } name 
   */
  addMongo(name) {
    this[name] = (value) => common.isMongo(value)
  }
}

exports.Fields = Fields
