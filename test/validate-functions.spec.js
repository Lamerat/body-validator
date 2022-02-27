const { success } = require('../src/constants')
const { validateString } = require('../src/stringCheck')
const common = require('../src/commonCheck')

describe('String validator', () => {
  test('Validate type', () => {
    expect(validateString('this is string')).toBe(success)
    expect(validateString()).not.toBe(success)
    expect(validateString('  ', { canBeEmpty: true })).toBe(success)
    expect(validateString('  ', { canBeEmpty: false })).not.toBe(success)
  });

  test('Validate length', () => {
    expect(validateString('123456789', { minSymbols: 5 })).toBe(success)
    expect(validateString('123456789', { minSymbols: 10 })).not.toBe(success)
    expect(validateString('123456789', { maxSymbols: 10 })).toBe(success)
    expect(validateString('123456789', { maxSymbols: 5 })).not.toBe(success)
    expect(validateString('123456789', { minSymbols: 10, maxSymbols: 5 })).not.toBe(success)
    expect(validateString('1234', { minSymbols: 2, maxSymbols: 4 })).toBe(success)
    expect(validateString('12 34', { minSymbols: 2, maxSymbols: 4, allowSpaces: false })).not.toBe(success)
  });

  test('Only letters', () => {
    expect(validateString('12345', { include: 'lettersOnly' })).not.toBe(success)
    expect(validateString('123Elka45', { include: 'lettersOnly' })).not.toBe(success)
    expect(validateString('elka', { include: 'lettersOnly' })).toBe(success)
    expect(validateString('елка', { include: 'lettersOnly' })).toBe(success)
    expect(validateString('елка elka', { include: 'lettersOnly' })).toBe(success)
    expect(validateString('елка elka', { include: 'lettersOnly', allowSpaces: false })).not.toBe(success)
  })

  test('Only numbers', () => {
    expect(validateString('12345a', { include: 'numbersOnly' })).not.toBe(success)
    expect(validateString('12345', { include: 'numbersOnly' })).toBe(success)
    expect(validateString('12.05', { include: 'numbersOnly' })).not.toBe(success)
  })

  test('Only numbers and letters', () => {
    expect(validateString('12345a', { include: 'lettersAndNumbers' })).toBe(success)
    expect(validateString('12345 Тест', { include: 'lettersAndNumbers' })).toBe(success)
    expect(validateString('12.05', { include: 'lettersAndNumbers' })).not.toBe(success)
    expect(validateString('12-05', { include: 'lettersAndNumbers' })).not.toBe(success)
  })

  test('Black list symbols', () => {
    expect(validateString('12345a', { blackList: [ 's', 'd' ] })).toBe(success)
    expect(validateString('my second test', { blackList: [ 'e', 'd' ] })).not.toBe(success)
    expect(validateString('No  double  spaces', { blackList: [ '  ' ] })).not.toBe(success)
  })

  test('Max words', () => {
    expect(validateString('This is four words', { maxWords: 4 })).toBe(success)
    expect(validateString('Ignore  double  spaces', { maxWords: 3 })).toBe(success)
    expect(validateString('Ignore  double  spaces', { maxWords: 2 })).not.toBe(success)
  })
});


describe('Common validator', () => {
  test('Validate MongoDB Id', () => {
    expect(common.isMongo('507f191e810c19729de860ea')).toBe(success)
    expect(common.isMongo('507f191e810c19729de860ea1')).not.toBe(success)
  })

  test('Validate Date', () => {
    expect(common.isDate('2000-12-30')).toBe(success)
    expect(common.isDate('2021-12-20T14:29:54.254+0000')).toBe(success)
    expect(common.isDate('2112-30-10')).not.toBe(success)
  })

  test('Validate Boolean', () => {
    expect(common.isBoolean('true')).not.toBe(success)
    expect(common.isBoolean(true)).toBe(success)
    expect(common.isBoolean(false)).toBe(success)
    expect(common.isBoolean(1)).not.toBe(success)
  })

  test('Validate Email', () => {
    expect(common.isEmail('elka@dir.b1g')).not.toBe(success)
    expect(common.isEmail('@n3lia@dir.bg')).not.toBe(success)
    expect(common.isEmail('elka_1298@yahoo.com')).toBe(success)
    
  })

  test('Validate Number', () => {
    expect(common.isNumber('ten')).not.toBe(success)
    expect(common.isNumber('10')).toBe(success)
    expect(common.isNumber('10', { min: 9 })).toBe(success)
    expect(common.isNumber('10', { min: 12 })).not.toBe(success)
    expect(common.isNumber('1020', { min: 12, max: 100 })).not.toBe(success)
    expect(common.isNumber('60', { min: 12, max: 100 })).toBe(success)
    expect(() => common.isNumber('60', { min: 20, max: 10 })).toThrow()
  })

  test('Validate URL', () => {
    expect(common.isURL('ten')).not.toBe(success)
    expect(common.isURL('www.hit.com')).not.toBe(success)
    expect(common.isURL('http://www.hit.com')).toBe(success)
    expect(common.isURL('ws://www.hit.com')).not.toBe(success)
  })
})
