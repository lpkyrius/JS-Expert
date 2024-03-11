import { Duplex, Transform } from 'stream'

let count = 0;
const server = new Duplex({
    objectMode: true, // to avoid working with buffer, works with string instead. However, it uses more memory
    encoding: 'utf-8',// utf-8 is the default anyway
    read() {
        const everySecond = (intervalContext) => { //intervalContext to provide the Interval id. So, we can stop it below.
            if(count++ <= 5) {
                this.push(`My name is Leandro[${count}]`)
                return;
            }
            clearInterval(intervalContext) // stops the Interval execution
            this.push(null) // says to NodeJS that our promise has finished
        }
        // to stop Interval we need its context 'this'
        // that's why we past IntervalContext as a parameter above
        // and use 'this' below
        setInterval( function() { everySecond(this) })
    },
    // this write is like a totally different object
    write(chunk, encoding, cb) {
        console.log(`[writable] saving`, chunk)
        cb()
    }
})

// to see they are unlike communication channels
// write trigger the Duplex writable 
server.write('[duplex] hey this is a writable!\n')

// on data -> logs what happens in readable's .push 
// server.on('data', msg => console.log(`[readable]${msg}`))

// the push lets you send more data
server.push(`[duplex] hey this is also a readable!\n`)

// server
//     .pipe(process.stdout)


const transformToUpperCase = Transform({
    objectMode: true, // so we work with the data without having to use .toString()
    transform(chunk, enc, cb) {
        cb(null, chunk.toUpperCase())
    }
})

// transform is also a duplex but they have no independent communication
transformToUpperCase.write('[transform] hello from write (from inside upperCase())!')
// push ignores what you have in transform function 
transformToUpperCase.push('[transform] hello from push (did not pass inside upperCase())\n')
server
    .pipe(transformToUpperCase )
    // redirect all readable's data to Duplex's writable
    // there was no connection between them, but .pipe makes the connection
    .pipe(server)