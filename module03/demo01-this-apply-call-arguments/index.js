// top  -----------------------------

// More about this subject: https://medium.com/@erickwendel/node-v14-x-is-up-deep-diving-into-new-features-ace6dd89ac0b 

'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, fileName) {
        console.log('this', this)
        // arguments: gets the list of arguments sent to the function
        // however, use 'arguments' directly is a bad practice in JS, we may lose control of what is sent to the function
        // let's use Array.prototype.slice.call to avoid an array of objects with numeric indexes 
        console.log('arguments', Array.prototype.slice.call(arguments)) 
        this.showContent(fileName)
    }

    async showContent(fileName){
       console.log((await readFile(fileName)).toString()) 
    }
}

// watch(__filename, async (event, fileName) => {
    
// })

const file = new File()
// with this approach, the 'this' from File class is ignored
// and it inherits the 'this' from the function watch
// watch(__filename, file.watch)

// an alternative is to use arrow function
// but it's not the best approach
// watch(__filename, (event, fileName) => file.watch(event, fileName))

// let's make explicity the context this function will have
// .bind() replaces the function 'this' and returns a new function
// watch(__filename, file.watch.bind(file))
// So, every time we delegate a function in order to another one executes it...
// use .bind(context for the 'this')

file.watch.call({ showContent: () => console.log('call: hey sinon') }, null, __filename) // null=event(that we don't need now)
file.watch.apply({ showContent: () => console.log('call: hey sinon') }, [null, __filename] ) // null=event(that we don't need now)


// end  -----------------------------