import { Readable, Writable } from 'stream'

// data source
const readable = Readable({
    read() {
        this.push('Hello World 1')
        this.push('Hello World 2')
        this.push('Hello World 3')

        // to inform the data has ended
        this.push(null)
    }
})

// output data
const writable = Writable({
    write(chunk, encoding, cb) {
        // here we can use .toString because it's just a chunk (not a big data)
        console.log('msg', chunk.toString())

        cb() // to inform the function has ended
    }
})

readable
    // the writable is the output (print, save or ignore)
    .pipe(writable)
    // .pipe(process.stdout)