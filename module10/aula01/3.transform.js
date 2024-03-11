import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

/*

Best option in my opinion.
We have each function with its own responsibility (read, write, transform)
It's simpler than Duplex

*/


// data source
const readable = Readable({
    read() {
        // 1.000.000 1e6
        for(let index = 0; index < 1e5; index++) {
        // for(let index = 0; index < 2; index++) {
            const person = { id: Date.now() + index, name: `Leandro-${index}` }
            const data = JSON.stringify(person)
            this.push(data)
        }

        // to inform the data ended
        this.push(null)
    }
})

// data processing uses Transform()
const mapFields = Transform({
    transform(chunk, encoding, cb) {
        const data = JSON.parse(chunk) // because the chunk has been stringified above in readable
        const result = `${data.id}, ${data.name.toUpperCase(0)}\n`
    
        cb(null, result)
    }
})

const mapHeaders = Transform({
    transform(chunk, encoding, cb) {
        // only for the 1st row (0 or null) it returns the headers. Then, just concat the chunk
        this.counter = this.counter ?? 0;
        if(this.counter) {
            return cb(null, chunk)
        }
    
        this.counter += 1;
        cb(null, "id,name\n".concat(chunk))
    }
})

// pipeline: let's read > map fields, add the header (if it's for the 1st row) > write it
const pipeline = readable
    .pipe(mapFields) // keep mapping files
    .pipe(mapHeaders)// Add the header (1st line)
    // the writable is the output (print, save or ignore)
    // .pipe(writable)

    // output data
    // .pipe(process.stdout) // uncomment to show in terminal
    .pipe(createWriteStream('my.csv')) // fs function to receive a chunk (buffer) and add into a file

pipeline
    .on('end', () => console.log('finished!'))