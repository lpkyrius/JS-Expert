const { expect } = require('chai');
const { it, describe } = require('mocha');
const { productValidator } = require('./../src/'); // search for index (default)
const ProductDataBuilder = require('./model/productDataBuilder');

describe('Test Data Builder', () => {
    it('shouldn\'t return error with valid product', () => {
        const product = ProductDataBuilder.aProduct().build();
        const result = productValidator(product);

        const expected = {
            errors: [],
            result: true
        }

        expect(result).to.be.deep.equal(expected);
    } )
})