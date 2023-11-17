const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('./../src/util');

describe('Util', () => {
    it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        /*
        // it keeps running and breaks everything
        catastrophic backtracking!
        time \
        node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legalzin')"
        */

        // validating the customized error
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe, dude!`)
    })
})