const { deepEqual } = require('assert')
const assert = require('assert')

// Usually, it's used for Lists of unique items

const arr1 = [ "0", "1", "2"];
const arr2 = [ "2", "0", "3"];
const arr3 = arr1.concat(arr2);
// console.log('arr3', arr3);
// console.log('arr3', arr3.sort());
assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set()
arr1.map(item => set.add(item)) // adding arr1 items
arr2.map(item => set.add(item)) // adding arr2 items
// console.log('Set with add item per item', set) 
// 'set' is not an array but an Object -> { '0', '1', '2', '3' }
// So, let's use Array.from(set) to transform it into an array
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3' ])
// rest/spread
// const setTmp = new Set([ ...arr1, ...arr2]); // <- this is pretty! Just one single line!
// console.log('spread', setTmp); 
assert.deepStrictEqual(Array.from(new Set([ ...arr1, ...arr2])), ['0', '1', '2', '3' ]);

// >>>> paused at 5'10

// console.log('set', set);
// // both below return the same thing. They keep it for compatibilities reasons.
// console.log('set.keys', set.keys());
// console.log('set.values', set.values()) // it exists only because of Map

// on an Array, to check if an item exists...
// [].indexOf('1') !== -1 or [0].includes(0)
// set uses .has
assert.ok(set.has('3'))

// same theory of Map, but with set you will always work with the entire list
// it has no GET, so you can know if the item is there or not and only it.
// in the documentation there are examples on how to do interceptions, ...
// ...what one the list has that another list has not, and so long.

// both arrays have
const users01 = new Set([
    'leandro',
    'mary',
    'stuart',
])

const users02 = new Set([
    'joaozinho',
    'leandro',
    'dave'
])

// that's a better way of check, better than running 2 for() filter()...
const intersection = new Set([...users01].filter(user => users02.has(user)));
// console.log('intersection', intersection);
assert.deepStrictEqual(Array.from(intersection), ['leandro']);

// now what do we have in users01 that users02 doesn't have
const difference = new Set([...users01].filter(user => !users02.has(user)));
// console.log('difference', difference);
assert.deepStrictEqual(Array.from(difference), ['mary', 'stuart']);


// weakSet

// same idea of WeakMap
// you can't iterate (actually, the Set is already like that)
// it only work with keys as reference
// it only has simple methods

const user = { id: 123}
const user2 = { id: 321}

const weakSet = new WeakSet([ user ])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)
