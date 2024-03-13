import { Writable, PassThrough } from 'stream'
import axios from 'axios';

const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

const request = await Promise.all([
    axios({
        method: 'GET',
        url: API_01,
        responseType: 'stream'
    }),
    axios({
        method: 'GET',
        url: API_02,
        responseType: 'stream'
    }),
])

const results = request.map(({ data }) => data)

const output = new Writable({
    write(chunk,encoding, callback){
        const data = chunk.toString().replace(/\n/, '')

        //  Made using https://regex101.com/
        // ?=- go after '-' and look back
        // :"(?<name>.*) search for the content inside " after ':' to extract only the name
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
        console.log(`[${ name.toLowerCase() }] ${ data }`)
        callback()
    }
})

function merge(streams){
    return streams.reduce((prev, current, index, items) => {
        // false to avoid the stream to close automatically 
        current.pipe(prev, { end: false })
        // because we've used false above, now - to end prev stream we
        // check if all the streams are ended. Only them he forces all the 
        // prev chain ends. 
        current.on('end', () => items.every(s => s.ended) && prev.end())
        return prev

    }, new PassThrough())
}

merge(results)
    .pipe(output)
// result[0].pipe(output)
// result[1].pipe(output)