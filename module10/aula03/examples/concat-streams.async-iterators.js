import { pipeline } from 'stream/promises'
import { Writable } from 'stream'
import axios from 'axios'

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

// writable stream 
async function* output(stream) {
    for await (const data of stream) {
        //  Made using https://regex101.com/
        // ?=- go after '-' and look back
        // :"(?<name>.*) search for the content inside " after ':' to extract only the name
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
        console.log(`[${ name.toLowerCase() }] ${ data }`)
    }
}
// passthrough stream 
async function* merge(streams) {
    for (const readable of streams) {
        // to work with objectMode (we don't need to work with buffer)
        readable.setEncoding('utf8')
        for await (const chunk of readable) {
            for (const line of chunk.trim().split(/\n/)) {
                yield line
            }
        }
    }
}

await pipeline(
    merge(results),
    output
)