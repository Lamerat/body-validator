const validator = require('validator')
const { success } = require('./constants')

const includeTypes = 'lettersOnly' || 'numbersOnly' || 'lettersAndNumbers'
const locales = [ 'bg-BG', 'en-US' ]

exports.stringOptions = {
  minSymbols: 1,
  maxSymbols: 10,
  canBeEmpty: false,
  allowSpaces: true,
  maxWords: 3,
  /**@type {Array<String>} */
  blackList: [],
  /**@type {includeTypes} */
  include: '',
}

/**
 * Check string for different requirements
 * @param {String} str String for check
 * @param {stringOptions} options Checking options
 * @returns success or error message
 */
exports.validateString = (str, options) => {
  if (typeof str === 'undefined') return `Missing value!`
  if (typeof str !== 'string') return `'${str}' is not a 'string' type!`
  if (options?.canBeEmpty === false && !str.trim().length) return `can't be empty!`

  const errors = []
  str = str.trim()

  if (options?.allowSpaces === false && str.split('').some(x => ' ')) errors.push(`can't include spaces`)

  if ((options?.minSymbols || options?.maxSymbols) && !validator.isLength(str, options.minSymbols, options.maxSymbols)) {
    const result = []
    if (options.minSymbols) result.push(`must be min. ${options.minSymbols} characters`)
    if (options.maxSymbols) result.push(`must be max. ${options.maxSymbols} characters`)
    return result.join(' and ') + '!'
  }

  if (options?.include === 'lettersOnly') {
    const symbols = str.split('').filter(x => x !== ' ')
    let invalid = false

    symbols.forEach(symbol => {
      const check = locales.map(locale => validator.isAlpha(symbol, locale))
      if (check.every(x => x === false )) invalid = true
    })
    
    if (invalid) errors.push(`must include only letters!`)
  }

  if (options?.include === 'numbersOnly') {
    const validChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
    const check = str.split('').some(x => !validChars.includes(x))
    if (check) errors.push(`must include only numbers!`)
  }

  if (options?.include === 'lettersAndNumbers') {
    const symbols = str.split('').filter(x => x !== ' ')
    let invalid = false

    symbols.forEach(symbol => {
      const check = locales.map(locale => validator.isAlphanumeric(symbol, locale))
      if (check.every(x => x === false )) invalid = true
    })
    
    if (invalid) errors.push(`must include only numbers and letters!`)
  }

  if (options?.blackList && options.blackList.map(x => str.includes(x)).some(el => el === true)) errors.push(`can't include symbols [ ${options.blackList} ]!`)

  if (options?.maxWords && str.split(' ').filter(x => x !== '').length > options.maxWords) errors.push(`must be max ${options.maxWords} words!`)

  if (errors.length) return errors.join(' | ')
  return success
}

