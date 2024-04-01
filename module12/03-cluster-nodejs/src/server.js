//  test with: 
// sh bench.sh

// counting log.txt lines:
// cat log.txt | grep 23854 | wc -l
// result:  123994


import { createServer } from 'http'
import { appendFile } from 'fs/promises'

export function initializeServer() {
    async function handler(request, response) {
        await appendFile('./log.txt', `processed by ${ process.pid }\n`)
    
        // let's use Math.floor(Math.random() * 40) to simulate a heavy processing
        const result = Array.from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
        .reduce((prev, next) => prev + next,0) // to get the array returned above and turn it into a unique value
    
        response.end(result.toString())
    }
    
    // the cluster uses our PORT as a symbolic port. Node will create a socket connection responding in our port.
    createServer(handler)
        .listen(3000, () => console.log(`server running at 3000 and pid ${ process.pid }`))

    // Let's force an error with un interval of 10k items
    setTimeout(() => process.exit(1), Math.random() * 1e4)
}