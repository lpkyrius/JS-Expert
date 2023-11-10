// --------------
// weird stuff with JavaScript
// more at https://wtfjs.com/ or https://github.com/brianleroux/wtfjs 
// --------------

9999999999999999 // 16 times
// 10000000000000000

true + 2
// 3

'21' + true
// '21true'

'21' - true
// 20

'21' - - 1
// 22

0.1 + 0.2 === 0.3
// false -> 0.30000000000000004

3 > 2 // true 
2 > 1 // true 
// but:
3 > 2 > 1
// false
// and
3 > 2 >= 1
// true

"B" + "a" + + "a" + "a"
// BaNaNa

'21' - -1
// 22 (convert to number and add 1)

'1' == 1 // true
'1' === 1 // false

// --------------

console.assert(String(123) === '123', "explicit conversion to string") // no problem. So, no feedback.
// console.assert(String(123) === '123a', "explicit conversion to string") // error message as feedback.
console.assert(123 + '' === '123', "implicit conversion to string") // no problem. So, no feedback.

console.assert(('hello' || 123) === 'hello', "|| returns the first element!")
console.assert(('hello' && 123) === 123, "&& returns the last element!")

// Objects --------------
// Follows an order: if the value is primitive, returns it, otherwise follows an order to make the conversion
// According to what we try if follows: valueOf > toString > 
// For example, without string.concat ( ''.concat(item) ) it calls valueOf, if concat (that forces string conversion) it calls toString

const item = {
    name: 'LeandroPassos',
    age: 49,
    // to console.log('item', item + 0)
    // string: 1 if it's not primitive, calls valueOf
    // overwriting toString() with this code to return a string
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`
    },
    // to console.log('item', item + 0)
    // number: 1 if it's not primitive, calls toString
    // overwriting valueOf
    valueOf() {
        return { hey: 'dude'}
    },
    // has top priority!
    [Symbol.toPrimitive](coercionType) {
        // console.log('trying to convert to', coercionType)
        const types = {
            string: JSON.stringify(this),
            number: '0007'
        }

        return types[coercionType] || types.string
    }
}

// console.log('toString', String(item))

// // will return NaN because toString returns a string
// console.log('valueOf', Number(item))

// after add toPrimitive
// console.log('String', String(item))
// console.log('Number', Number(item))
// // calls the conversion default!
// console.log('Date', new Date(item))

console.assert(item + 0 === '{"name":"LeandroPassos","age":49}0')
// console.log('!!item is true?', !!item)
console.assert(!!item)

// console.log('string.concat', 'Ae'.concat(item))
console.assert('Ae'.concat(item) === 'Ae{"name":"LeandroPassos","age":49}')

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item))

const item2 = { ...item, name: "Jhon", age: 20}
// console.log('New Object', item2)
console.assert(item2.name === "Jhon" && item2.age === 20)

console.log('Done!')