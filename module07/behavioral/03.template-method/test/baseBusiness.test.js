import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/util/exceptions.js'

describe('#BaseBusiness', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })
    
    test('should throw an error when child class doesnt implement _validateRequiredFields function', () => {
        // We use BaseBusiness{empty} to be sure that we don't have those 2 functions implemented, to throw error.
        class ConcreteClass extends BaseBusiness { }
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._validateRequiredFields.name
        )

        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should throw an error when _validateRequiredFields returns false', () => {
        const VALIDATION_DOESNT_SUCCEEDED = false

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEEDED)
        }

        const concreteClass = new ConcreteClass()
        const validationError = new Error(`invalid data!`)

        expect(() => concreteClass.create({})).toThrow(validationError)
    })

    test('should throw an error when child class doesnt implement _create function', () => {
        const VALIDATION_SUCCEEDED = true

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
        }

        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._create.name
        )

        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should call _create and _validateRequiredFields on create', () => {
        const VALIDATION_SUCCEEDED = true
        const CREATE_SUCCEEDED = true

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
            _create = jest.fn().mockReturnValue(CREATE_SUCCEEDED)
        }

        const concreteClass = new ConcreteClass()
        const createFromBaseClass = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name,
        )
        const result = concreteClass.create({})
        expect(result).toBeTruthy()
        expect(createFromBaseClass).toHaveBeenCalled()
        expect(concreteClass._create).toHaveBeenCalled()
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
    })


})