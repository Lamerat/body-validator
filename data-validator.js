const success = 'success'
const includeTypes = 'lettersOnly' || 'numbersOnly' || 'lettersAndNumbers'

const stringOptions = {
  min: 1,
  max: 10,
  empty: false,
  blackList: [],
  spaces: true,
  maxWords: 3,
  /**@type {includeTypes} */
  include: 'lettersAndNumbers',
  isEmail: true,
}

const regExes = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  lettersOnly: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/g,
  numbersOnly: /^[0-9]+$/g,
  noSpecials: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
}

/**
 * Check string for different requirements
 * @param {String} str String for check
 * @param {stringOptions} options Checking options
 * @returns success or error message
 */
const validateString = (str, options) => {
  if (typeof str === 'undefined') return `Missing value!`
  if (typeof str !== 'string') return `'${str}' is not a 'string' type!`
  if (!options?.empty && !str.trim().length) return `can't be empty!`

  str = str.trim()
  if (options?.min && str.length < options.min) return `must be min. ${options.min} characters!`
  if (options?.max && str.length > options.max) return `must be max. ${options.max} characters!`
  if (options?.include && options.include === 'lettersOnly' && regExes.lettersOnly.test(str)) return `must include only letters!`
  if (options?.include && options.include === 'numbersOnly' && regExes.numbersOnly.test(str)) return `must include only numbers!`
  if (options?.include && options.include === 'lettersAndNumbers' && regExes.noSpecials.test(str)) return `must include only letters!`
  if (options?.isEmail && !regExes.email.test(str)) return `is not valid e-mail!`
  if (options?.blackList && new RegExp(`${options.blackList.join('*')}`, 'g').test(str)) return `cannot include '${options.blackList.join(' ')}' symbols!`
  if (!options?.spaces && str.includes(' ')) return `cannot include spaces!`
  if (options?.maxWords && str.split(' ').filter(x => x.trim()).length > options.maxWords) return `must be max. ${options.maxWords} words!`

  return success
}

