const assert = require('assert');

function* calculation(arg1, arg2) {
    yield arg1 * arg2;
}

function *main() {
    yield 'Hello'
    yield '-'
    yield 'World!'
    yield* calculation(20, 10) // only with * node will execute the function
}

const generator = main();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

// --- Generators 
// 1st way
assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: '-', done: false });
assert.deepStrictEqual(generator.next(), { value: 'World!', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });
// 2nd way
assert.deepStrictEqual(Array.from(main()), [ 'Hello', '-', 'World!', 200 ]);
// 3rd way
assert.deepStrictEqual([...main()], [ 'Hello', '-', 'World!', 200 ]);


// Async Iterators
const { readFile, stat, readdir } = require('fs/promises');

function* promisified(){
    yield readFile(__filename);
    yield Promise.resolve('Hey dude!')
}

// This first console will return:
// promisified [ Promise { <pending> }, Promise { 'Hey dude!' } ]
// because they're not done yet.
// console.log('promisified', [...promisified()]);

// So, let's...
// Promise.all([...promisified()]).then(results => console.log('promisified', results));

// ;(async () => {
//     for await (const item of promisified()){
//         console.log('for await', item.toString())
//     }
// })()

async function* systemInfo() {
    const file = await readFile(__filename);
    yield { file: file.toString() }

    const { size } = await stat(__filename);
    yield { size };

    const dir = await readdir(__dirname);
    yield { dir };
}

;(async () => {
    for await (const item of systemInfo()){
        console.log('systemInfo', item)
    }
})()