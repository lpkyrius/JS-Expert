const assert = require('assert')
const obj = {}
const arr = []
const fn = () => {}

/* 
----------------------------------------------
Note: The use of proto is controversial and discouraged. 
Its existence and exact behavior have only been standardized as 
a legacy feature to ensure web compatibility, 
while it presents several security issues and footguns. 
For better support, prefer 
Object.getPrototypeOf()/Reflect.getPrototypeOf() 
and 
Object.setPrototypeOf()/Reflect.setPrototypeOf() 
instead.
---------------------------------------------- 
*/

// internally, literal objects turn into explicity functions
console.log('new Object() is {}? ', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ is the reference to the object that contains the object properties. Every object property is redirected to __proto__
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__ , Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__ , Function.prototype)

// the __proto__ of Object.prototype is null
// __proto__ inherits from the object and, ultimately, everything inherits from null
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__, null)

// ---------
console.log('-------')

// this "function Name() {} is an old way to create classes, yet from ES5."
function Employee() {}
Employee.prototype.salary = () => "salary**"

function Supervisor() {}
// herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager(){}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// we can call it using prototype but not directly (which would return an error)
console.log('Manager.prototype.salary()', Manager.prototype.salary())
// console.log('Manager.prototype.salary()', Manager.salary())

// if we don't call 'new', the first __proto__ will always be
// the Function instance, doesn't inherit our classes
// in order to access the classes without 'new', 
// we can access directly through prototype
console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

console.log('-----')

// when we call using 'new', the __proto__ receives the current object's prototype 
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

console.log('-----')

const manager = new Manager()
console.log('manager.salary()', manager.salary())
console.log('manager.profitShare()', manager.profitShare())
console.log('manager.monthlyBonuses()', manager.monthlyBonuses())

// now, as mentioned above:
// the __proto__ of Object.prototype is null
// __proto__ inherits from the object and, ultimately, everything inherits from null
assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)


console.log('-----')
class T1 {
    ping() { return 'ping'}
}

class T2 extends T1 { 
    pong() { return 'pong'}
}

class T3 extends T2 {
    shoot() { return 'shoot'}
}

const t3 = new T3()

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log('t3.ping()', t3.ping())
console.log('t3.pong()', t3.pong())
console.log('t3.shoot()', t3.shoot())

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
