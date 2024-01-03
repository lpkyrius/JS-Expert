import { Readable, Writable, Transform } from 'stream'
import { createWriteStream } from 'fs'

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

// data processing
const mapFields = Transform({
    transform(chunk, encoding, cb) {
        const data = JSON.parse(chunk)
        const result = `${data.id}, ${data.name.toUpperCase(0)}\n`
    
        cb(null, result)
    }
})

const mapHeaders = Transform({
    transform(chunk, encoding, cb) {
        // only for the 1st row (0 or null) we add the headers
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
    .pipe(mapFields)
    .pipe(mapHeaders)
    // the writable is the output (print, save or ignore)
    // .pipe(writable)
    // .pipe(process.stdout)
    // output data
    // .pipe(process.stdout)
    .pipe(createWriteStream('my.csv'))

pipeline
    .on('end', () => console.log('finished!'))