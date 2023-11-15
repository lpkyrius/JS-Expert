const assert = require('assert');
const myMap = new Map();

// you can use anything as keys
myMap
    .set(1, 'one')
    .set('Leandro', { text: 'two'})
    .set(true, () => 'hello!')

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1'],
])

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));
assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Leandro'), { text: 'two' });
assert.deepStrictEqual(myMap.get(true)(), 'hello!'); // true is a function here, the () is to execute it

// On Objects, the key can only be string or symbol (numbers are coerced to strings)
const onlyRefenceWorks = { id: 1};
myMap.set(onlyRefenceWorks, { name: 'LeandroPassos' })

// console.log('get', myMap.get(onlyRefenceWorks)); // myMap.get({ id: 1 }) will not work (only reference works)

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyRefenceWorks), { name: "LeandroPassos" })

// utilities
// - On Object we use Object.keys({a: 1}).length, Maps we use .size
assert.deepStrictEqual(myMap.size, 4);

// to check if an item exists in an Object
//  item.key = if it doesn't exist, returns undefined
// within the if() does the implicit coercion to boolean and returns false
// The correct way for Object is ({ name: 'Leandro' }).hasOwnProperty('name')
// console.log('Does item exist',({ name: 'Leandro' }).hasOwnProperty('name')); // -> True
// console.log('Does item exist',({ name: 'Leandro' }).hasOwnProperty('age')); // -> False
// but the way above is still a verbose one. So, in Maps we use .has
assert.ok(myMap.has(onlyRefenceWorks));

// to remove an item from the Object:
//  delete item.id 
// but it does not perform well for Javascript
// In Maps we use .delete(key) which returns true after removing the item
assert.ok(myMap.delete(onlyRefenceWorks))

// we can't iterate in Objects directly
// you got to transform it with Object.entries(item)
// but Maps implements iterators pattern:
// this 1st attempt may have an issue because the "true" has a function
// assert.deepStrictEqual([...myMap], [[1, "one"], ["Leandro"], { "text": "two" }], [true, null]);
// So, let's replace the 'null' with an empty function '() => { }'
// assert.deepStrictEqual([...myMap], [[1, "one"], ["Leandro"], { "text": "two" }], [true,  () => { }]);
// Ok, but they are not deep strict equal yet because they have different memory addresses. So, let's use stringify both:
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Leandro", { "text": "two" }], [true, () => { }]]))

// for (const [key, value] of myMap) {
//     console.log({key, value});
// }

// Object is not safe because, according to the key name, the user could replace a standard behavior

// ({ }).toString() returns '[object Object]'
// but using toString it's possible to replace it, see:
// ({toString: () => 'Hey' }).toString()  returns 'Hey'

// Any key may collide, properties inhered through prototype chain such as 
// constructor, toString, valueOf, etc.

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
}

// there is no name key's restriction 
myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// there is no how to clear an Ojb without reassigning it
// but on Maps we can use .clear()
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// So, we can use the structure Map rather then Object when:
// - need to add keys frequently
// - need to validate if a key exists (semantic)
// - need to have an oject working as a database (you have the key and a data group)
// - need to clear the references after using it. e.g html with a reset button (to avoid updating the default value for every single one)

//  ---  WeakMap


// Can be collected after losing its references
// Used in super specific cases.

// It has the majority of Map's benefits
// BUT: you CAN'T iterate (use for())
// Only reference keys that you already know can be used
// lighter and prevents memory leaks, because after the instances leave memory, everything is cleaned (garbage collector)

const weakMap = new weakMap()
const hero = { name: 'Flash'}

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)