import { createServer } from 'http'
import BusinessError from './errors/businessError.js'
import { statusCodes } from './util/httpStatusCodes.js'

function validateHero (hero) {
    // to simulate another error such as DB error
    if (Reflect.has(hero, "connectionError")) {
        // generic error for any other unexpected scenario 
        throw new Error("error connecting to database!")
    }
    
    if (hero.age < 20) {
        throw new BusinessError("age must be higher than 20!")
    }

    if (hero.name?.length < 4) {
        throw new BusinessError("name must be higher than 4!")
    }
}

async function handler(request, response) {
    for await (const data of request) {
        try {
            const hero = JSON.parse(data)
            validateHero(hero)
            console.log({ hero })
            response.writeHead(statusCodes.OK)
            response.end()

        } catch (error) {
            if (error instanceof BusinessError) {
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(error.message) // error.message because we've populated the msg with a custom message
                continue; // to continue inside the 'For' above
            }
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('running at 3000'))

/*
    curl -i localhost:3000 -X POST --data '{"name": "Avenger", "age": 80}'
*/