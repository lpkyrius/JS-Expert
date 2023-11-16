// Design Pattern Observer: you can add observers in entities and when something changes, everyone will be notified
// Proxy structure in JS allow us to do exactly the same!
// best scenario for it is http, if a new user connects, the entire network must know that there is a new client...
// to send and receive messages, and so long!

'use strict';

const Event = require('events');
const event = new Event();
const eventName = 'counter';
event.on(eventName, msg => console.log('counter updated', msg));

// event.emit(eventName, 'Hi');
// event.emit(eventName, 'Bye');

const myCounter = {
    counter: 0
}

const proxy = new Proxy(myCounter, {
    // set: every time we have a 'set', it will intercept and get this 3 parameters
    set: (target, propertyKey, newValue) => {
        // send info to event.on above
        event.emit(eventName, { newValue, key: target[propertyKey] });
        // And keep doing what would do, update the property value with the new value:
        target[propertyKey] = newValue;
        return true;
    },
    get: (object, prop) => {
        // console.log('Get Called', { object, prop });
        return object[prop];
    }
})

// Observe the execution priority (the order):
// Code: setInterval > setTimeout() > nextTick()
// 1 - nextTick() - first of all
// 2 - setTimeout() - future
// 1 - setInterval() - fast and always

setInterval(function () {
    proxy.counter += 1;
    console.log('[3]: setInterval')
    if (proxy.counter === 10) clearInterval(this)
}, 200)

// future
setTimeout(() => {
    proxy.counter = 4;
    console.log('[2]: timeout');
}, 100)

// to execute now but destroys the Node life cycle
// because it stops the execution stack to add this execution
// having total priority in NodeJS execution (bad practice)
process.nextTick(() => {
    proxy.counter = 2;
    console.log('[0]: nextTick');;
})

// to execute now but not so 
setImmediate(() => {
    console.log('[1]: setImmediate', proxy.counter)
});