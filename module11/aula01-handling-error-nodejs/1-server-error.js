import Http from 'http'

// test 
// curl -X POST -d '{}' localhost:3000
// curl -i -X POST -d '{}' localhost:3000

let count = 1; 

async function handler(request, response) {
    count ++;
    try {

        if (count % 2 === 0) {
            await Promise.reject('error inside HANDLER')
        }
        

        for await (const data of request) {
            // node old versions do not capture this error message
            if (count % 2 !== 0) {
                await Promise.reject('error inside FOR')
            }
            
            response.end()
        }
    } catch (error) {
        console.log('a server error has happened', error)
        response.writeHead(500)
        response.write(JSON.stringify({ message: 'internal server error!'} ))
        response.end()
    }
}

Http.createServer(handler)
    .listen(3000, () => console.log('running at 3000'))