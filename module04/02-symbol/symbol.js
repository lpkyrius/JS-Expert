const assert = require('assert');
const { it } = require('node:test');

// --- Keys ------------
// create a uniqueKey based on memory reference 
const uniqueKey = Symbol("userName");

const user = {};

user["userName"] = 'value for normal Objects';
user[uniqueKey] = 'value for symbol';

// console.log('getting normal Objects', user.userName);
// // it's always unique in memory address level
// console.log('getting normal Objects', user[Symbol("userName")]);
// console.log('getting normal Objects', user[uniqueKey]);

assert.deepStrictEqual(user.userName, 'value for normal Objects');

// it's always unique in memory address level
assert.deepStrictEqual(user[Symbol("userName")], undefined);

assert.deepStrictEqual(user[uniqueKey], 'value for symbol');

// console.log('symbols', Object.getOwnPropertySymbols(user));
// console.log('symbols', Object.getOwnPropertySymbols(user)[0]);

// It's hard to get but it's not secret! For exemple, you can see it by debugging.
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass -> bad practice (not found in Node codebase)
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);
// --- Keys ------------


// --- Well Known Symbols ------------
const obj = {
    // iterators -> that's what the * does under the hood
    // it has the array and the done function (that's true only there are no items anymore)
    [Symbol.iterator]: () => ({
        items: [ 'c', 'b', 'a' ],
        next () {
            return {
                done: this.items.length === 0,
                value: this.items.pop() // to return the last item and remove it.
            }
        }
    })
};

// for ( const item of obj ) {
//     console.log('item', item);
// }

assert.deepStrictEqual([...obj], [ 'a', 'b', 'c' ]);

const kItems = Symbol('kItems');
class MyDate {
    constructor(...args){ // receives all parameters 
        this[kItems] = args.map( arg => new Date(...arg) );
    }

    [Symbol.toPrimitive](coercionType) {
        if (coercionType !== "string") throw new TypeError()

        const items = this[kItems]
                        .map(item => 
                            new Intl 
                                .DateTimeFormat("pt-BR", { month: "long", day: "2-digit", year: "numeric"})
                                .format(item)
                        )

        return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction"}).format(items)
    }
    
    // let's iterate it since it's not a list for default
    *[Symbol.iterator](){
        for (const item of this[kItems]) {
            yield item;
        }
    }

    // to work with promises
    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for (const item of this[kItems]) {
            await timeout(100);
            // let's use toISOString() just to return on a different way of the sync one above
            yield item.toISOString(); 
        }
    }

    get [Symbol.toStringTag]() {
        return 'What?';
    }
};

const myDate = new MyDate(
    [2020, 03, 01], // month in JS starts with 0, so this one will be february
    [2018, 02, 02]
);

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 02),
];

// usually, a toString on an Object returns [object Object]
// the 2nd one, with Capital Letter is what we call toString Tag 
// We can replace it, as done in "get [Symbol.toStringTag]()" a few lines above
assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object What?]');

// Creating the "number" coercion with myDate + 1
assert.throws(() => myDate + 1, TypeError);

// Now, an explicity string coercions using String()
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018');

// Implementing Iterator
assert.deepStrictEqual([...myDate], expectedDates);

// ;(async() => {
//     for await(const item of myDate) {
//         console.log('asyncIterator', item);
//     }
// })()

;(async() => {
    const dates = await Promise.all([...myDate]);
    assert.deepStrictEqual(dates, expectedDates);
})