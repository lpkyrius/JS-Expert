import {
    expect,
    describe, 
    test,
    jest,
    beforeEach
} from '@jest/globals'
import Util from '../../src/util'

describe('#Util - Strings', () => {

    
    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
    })

    test('#upperCaseFirstLetter should transform the first letter in upperCase', () => {
        const data = 'hello'
        const expected = 'Hello'
        const result = Util.upperCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('#lowerCaseFirstLetter should transform the first letter in lowerCase', () => {
        const data = 'Hello'
        const expected = 'hello'
        const result = Util.lowerCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test.todo('#lowerCaseFirstLetter given an empty string it should return empty')
    test.todo('#upperCaseFirstLetter given an empty string it should return empty')
})