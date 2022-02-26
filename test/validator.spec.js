import Fields from '../src/Classes/Fields.js'
import Validator from '../src/Classes/Validator.js'


const fields = new Fields
fields.addNumber('age', { min: 5, max: 10 })
fields.addBoolean('status')

describe('Validators test', () => {
  test('Validate body', () => {
    const user = new Validator
    user.addField('age', fields.age, true)
    user.addField('status', fields.status, true)

    const userTest = { age: 10, status: true }
    const userTest2 = { age: 10, status: 1 }
    const userTest3 = { age: 10, statuses: true }

    expect(user.validateBody(userTest)).toBe(true)
    expect(user.validateBody(userTest2)).toBe(false)
    expect(user.validateBody(userTest3)).toBe(false)
  })

  test('Validate update body', () => {
    const user = new Validator
    user.addField('age', fields.age, true)
    user.addField('status', fields.status, true)

    const userTest = { age: 10 }
    const userTest2 = { age: 100, status: false }

    expect(user.validateBodyUpdate(userTest)).toBe(true)
    expect(user.validateBodyUpdate(userTest2)).toBe(false)
  })
})