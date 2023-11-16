// REFLECT intercepts functions to add behaviors.
// Goal: To ensure the Object's semantics and security.

'use strict'

const assert = require('assert');

// --- apply
const myObj = {
    add(myValue){
        // 'this' does not exist yet. So, who calls this function must pass the 'this'
        return this.arg1 + this.arg2 + myValue;
    }
}

// This is rare but can happen: replace the apply function:
// Function.prototype.apply = () => { throw new TypeError('Eita!')};

// This one is not so rare:
// myObj.add.apply = function () { throw new TypeError('Oops')};
assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

myObj.add.apply = function () { throw new TypeError('Oops')};
assert.throws(
    () => myObj.add.apply({}, []),
    {
        name: "TypeError",
        message: 'Oops'
    }
)

// --- Using Reflect
// Even with the changed apply() above, this next line works because Reflect has a different approach
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

// ---- apply

// --- defineProperty

// semantics questions
function MyDate() {}

// bad code, ugly! 
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there'})
// now it's gonna be better:
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude'})
assert.deepStrictEqual(MyDate.withObject(), 'Hey there');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude');
// --- defineProperty

// --- deleteProperty
const withDelete = { user: 'LeandroPassos'};
// non-performative, avoid as possible
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'XuxaDaSilva' };
Reflect.deleteProperty(withReflection, "user");
assert.deepStrictEqual(withReflection.hasOwnProperty("user"), false);
// --delete Property

//  ---- get

// We should use get only in reference instances
assert.deepStrictEqual(1['userName'], undefined) 
// using Reflection, we will get an exception
assert.throws(() => Reflect.get(1, "userName"), TypeError)
//  ---- get

//  --- has
assert.ok('superman' in { superman: ''}) // it's not so clear that we are searching for an Object key
assert.ok(Reflect.has({batman: ''}, "batman")) // now it is!
//  --- has

// --- ownKeys
const user = Symbol('user')
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'leandropassos'
}

// Through Object's methods we must do 3 requests
const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    // we need this next line, otherwise it will not return the Symbol (which is part of the properties)
    ...Object.getOwnPropertySymbols(databaseUser), 
];
// console.log('databaseUser', databaseUser);
// console.log('objectKeys', objectKeys);
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user]);
// using Reflection, only one method
// console.log('Reflect.ownKeys', Reflect.ownKeys(databaseUser));
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user]);
// --- ownKeys
