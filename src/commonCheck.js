const validator = require('validator')
const moment = require('moment')
const { success } = require('./constants')
const { validateString } = require ('./stringCheck')

const numOptions = { min: 0, max: 0 }


/**
 * Check string is valid MongoDB id
 * @param {String} str 
 * @returns { success | String }
 */
const isMongo = (str) => {
  const checkString = validateString(str, { canBeEmpty: false })
  if (checkString !== success) return checkString
  
  if (validator.isMongoId(str)) return success

  return `must be valid MongoDB Id!`
}


/**
 * Check string is valid date
 * @param { String } str 
 * @returns { success | String }
 */
const isDate = (str) => {
  const checkString = validateString(str, { canBeEmpty: false })
  if (checkString !== success) return checkString

  if (moment(str).isValid()) return success
  return `must be valid Date!`
}


/**
 * Check value is valid number. Like option can check for range
 * @param { String | Number } str 
 * @param { numOptions } [options]
 * @returns { success | String }
 */
const isNumber = (str, options) => {
  if (isNaN(str)) return 'is not valid number!'

  if (options) {
    const { min, max} = options
    if (min && max && min > max) throw new Error ('Wrong params! max must be greater from min!')
    
    str = Number(str)
  
    if (min && str < min) return `must be min ${min}!`
    if (max && str > max) return `must be max ${max}!`
  }

  return success
}

/**
 * Check value is Boolean
 * @param {Boolean} str 
 * @returns { success | 'must be Boolean!' }
 */
const isBoolean = (str) => typeof str === 'boolean' ? success : 'must be Boolean!'


/**
 * Check string is valid e-mail address
 * @param { String } str 
 * @returns { success | 'must be valid e-mail address!' }
 */
const isEmail = (str) => {
  const checkString = validateString(str, { canBeEmpty: false })
  if (checkString !== success) return checkString

  if (!validator.isEmail(str)) return 'must be valid e-mail address!'
  return success
}


/**
 * Check string is valid URL address
 * @param { String } str 
 * @returns { success | 'must be valid URL address!' }
 */
const isURL = (str) => {
  const checkString = validateString(str, { canBeEmpty: false })
  if (checkString !== success) return checkString

  if (!validator.isURL(str, { require_protocol: true })) return 'must be valid URL address!'
  return success
}


module.exports = { isMongo, isDate, isNumber, isBoolean, isEmail, isURL, numOptions }