import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import Order from '../src/entities/order.js';
import OrderBusiness from '../src/business/orderBusiness.js';

describe('Test suite for Template Method design pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    })
    describe('#OrderBusiness', () => {
        test('excecution Order Business without Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness();
            // All test must follow straight this flow of execution
            // if anyone forgets to call the validation function, 
            // it may broke all the system 
            const isValid = orderBusiness._validateRequiredFields(order);
            expect(isValid).toBeTruthy();

            const result = orderBusiness._create(order);
            expect(isValid).toBeTruthy();
        })
        test('excecution Order Business with Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness();
            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            )

            const calledCreateFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            )
            // with template method, the steps sequence is always executed
            // avoiding logic replication
            const result = orderBusiness.create(order);
            expect (result).toBeTruthy();
            expect(calledValidationFn).toHaveBeenCalled();
            expect(calledCreateFn).toHaveBeenCalled();
        })
    })
})