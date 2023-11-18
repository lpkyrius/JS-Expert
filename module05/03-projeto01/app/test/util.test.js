const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('./../src/util');
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI');

describe('Util', () => {
    it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        // validating the customized error
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe, dude!`)
    })
    it('#evaluateRegex should not throw an error using a safe regex', () => {
        const safeRegex = /^([a-z])$/
        // console.log(evaluateRegex(safeRegex))
        expect(evaluateRegex(safeRegex)).to.be.ok // returns ok because it returns the regular expression
    })
    it('#divideTextInColumns', () => {
        const content = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
                "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
            ].join("\n"),

        ];

        const result = new TextProcessorFluentAPI(content)
                    .divideTextInColumns()
                    .build()

        const expected = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e \ndomiciliada a Rua dos bobos",
                " zero",
                " bairro Alphaville",
                " São Paulo. "
            ]
        ];
        
        expect(result).to.be.deep.equal(expected);
    })
    it('#removeEmptyCharacters', () => {
        const content = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e \ndomiciliada a Rua dos bobos",
                " zero",
                " bairro Alphaville",
                " São Paulo. "
            ]
        ];

        const result = new TextProcessorFluentAPI(content)
                    .removeEmptyCharacters()
                    .build()
        
        const expected = [
            [
                "Xuxa da Silva",
                "brasileira",
                "casada",
                "CPF 235.743.420-12",
                "residente e domiciliada a Rua dos bobos",
                "zero",
                "bairro Alphaville",
                "São Paulo."
            ]
        ];
                
        expect(result).to.be.deep.equal(expected);
    })
})

/*

// it keeps running and breaks everything - the "catastrophic backtracking!" we see in https://regex101.com/
// let's use terminal with time command to calculate the time the command will take (and avoid freeze everything)
// remember the issue in this regex /^([a-z|A-Z|0-9]+\s?)+$/ is the last "+" (3rd last character) -> +$/
// This "+" creates a loop while searching within the strings. Remove it and everything works fine!

terminal:
time \
node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('woooa man how are you and how are you?') && console.log('any text')"
-
result: 
node --eval   0.17s user 0.01s system 96% cpu 0.179 total

terminal:
time \
node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('woooa man how are you and how are you and how?') && console.log('any text')"
-
result:
node --eval   2.04s user 0.03s system 93% cpu 2.203 total

terminal:
time \
node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('woooa man how are you and how are you and how are you?') && console.log('any text')"
-
result:
node --eval   32.42s user 0.08s system 97% cpu 33.254 total

we can check for more valid regex in safe-regex source regex.spec.js
*/