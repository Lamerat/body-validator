# body-validator
Validator for express request body

## HOW TO USE
```JavaScript
import { Field, Validator } from '@sea_flanker/body-validator'


// For example we want to validate body with date for hockey player with params
  {
    "firstName": "John",
    "lastName": "Smith",
    "teamNumber": 13,
    "birthDate" "1980-12-11",
    "height": 184,
    "photo": "https://my-albums.com/13.jpg",
  }

// Create new Field object and add validation rules for every field
const fields = new Field()
fields.addString('playerName', { maxWords: 2, include: 'lettersOnly' })  // Valid name will be with maximum 1 word, and including only letters
fields.addNumber('playerNumber', { min: 0, max: 99 }) // Valid player number, must be number, between 0 and 99
fields.addDate('justDate') // Because we want value to be just valid date, will used this field in many cases, for that named it 'justDate'
fields.addNumber('playerHeight', { min: 140, max: 240 }) // Valid player height, must be number, between 140 and 240
fields.addNumber('playerWeight', { min: 40, max: 160 }) // Valid player weight, must be number, between 40 and 160
fields.addURL('justURL') // field playerPhoto is need to be just valid URL address. We use this validation for every case when need validate URL

// Next we create body validator
export const playerValidator = new Validator() // Named playerValidator, because he will validate players data
playerValidator.addField('firstName', fields.playerName, true)
playerValidator.addField('lastName', fields.playerName, true)
playerValidator.addField('teamNumber', fields.playerNumber, true)
playerValidator.addField('birthDate', fields.justDate, false)
playerValidator.addField('height', fields.playerHeight, false)
playerValidator.addField('weight', fields.playerWeight, false)
playerValidator.addField('photo', fields.justURL, false)

// Finally use validator
// Ass middleware
playerRouter.post('/create', playerValidator.validateMiddleware, controller.addPlayer)
playerRouter.put('/:_id', playerValidator.updateValidateMiddleware, controller.editPlayer)

// Or just use method in last middleware
import { playerValidator } from './validators/index.js'

export const addPlayer = async (req, res) => {
  try {
    const { body } = req

    if (playerValidator.validateBody(body) === false) throw new Error('message') 

    const result = await Player.create(body)
    res.status(200).json({ success: true, result })
  } catch (error) {
    res.status(422).json({ success: false, message: error.message })
  }
}
```
