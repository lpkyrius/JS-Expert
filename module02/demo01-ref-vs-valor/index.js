const { deepStrictEqual } = require('assert')
let counter = 0
let counter2 = counter 
counter2++ 
// both will NOT have the same value
// > counter
// 0
// > counter2
// 1

const item = { counter: 0}
const item2 = item 
// primitive types generate a copy in memory
// both will have the same value
// > item.counter
// 0
// > item2.counter
// 0

deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

// reference type, copy the memory address
// so, pointing to the same place
item2.counter ++
deepStrictEqual(item, { counter: 1})
item.counter ++
deepStrictEqual(item2, { counter: 2})
