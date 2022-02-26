import { success, REQUEST_STATUS } from '../constants.js'

class Validator {
  /**
   * @param { String } name field name in req.body
   * @param { Fields } field 
   * @param { Boolean } required 
   */
  addField(name, field, required = false) {
    this[name] = { field, required }
  }


  /**
   * @param { object } body 
   */
  validateBody(body) {
    const result = Array.isArray(body) ? this._validateArray(body, true) : this._validateObject(body, true)
    
    return result === true ? true : false
  }


  /**
   * @param { object } body 
   */
  validateBodyUpdate(body) {
    const result = Array.isArray(body) ? this._validateArray(body, false) : this._validateObject(body, false)
    
    return result === true ? true : false
  }


  validateMiddleware(req, res, next) {
    const { body } = req
    const result = Array.isArray(body) ? this._validateArray(body) : this._validateObject(body)
    if (result === true) return next()

    return res.status(REQUEST_STATUS).json({ success: false, message: result })
  }


  updateValidateMiddleware(req, res, next) {
    const { body } = req
    const result = Array.isArray(body) ? this._validateArray(body, false) : this._validateObject(body, false)
    if (result === true) return next()

    return res.status(REQUEST_STATUS).json({ success: false, message: result })
  }


  /**
   * @param { object } body 
   * @param { Boolean } create if is true use required option
   */
  _validateObject(body, create = true) {
    const errors = []
    
    Object.keys(this).forEach(key => {
      if (!body.hasOwnProperty(key) && this[key].required && create) {
        errors.push(`Missing field '${key}'`)
        return
      }

      if (body.hasOwnProperty(key)) {
        const validateField = this[key].field(body[key])
        if (validateField !== success) errors.push(`'${key}' ${validateField}`)
      }
    })

    if (errors.length) return(errors.join(' | '))
    return true
  }


  /**
   * @param { Array<Object> } body 
   * @param { Boolean } create if is true use required option
   */
  _validateArray(body, create = true) {
    const errors = []

    body.forEach(el => {
      const checkElement = this._validateObject(el, create)
      
      if (checkElement !== true) errors.push(checkElement)
    })

    if (errors.length) return(errors.join(' | '))
    return true
  }
}


export default Validator